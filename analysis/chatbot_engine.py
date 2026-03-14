"""
Chatbot engine for civil engineering assistant.
Uses LangGraph with Gemini — stateless (no memory checkpointer).
Each request receives the full conversation history.
"""

from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated, Optional, Dict, Any
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
from langgraph.graph.message import add_messages
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0,
    google_api_key=os.getenv("GEMINI_API_KEY"),
)

SYSTEM_PROMPT = SystemMessage(
    content=(
        "You are a professional civil engineering assistant.\n\n"
        "SCOPE:\n"
        "- Structural engineering (RCC, steel, cracks, durability)\n"
        "- Geotechnical engineering (soil, foundation, slope stability)\n"
        "- Transportation engineering (roads, traffic, pavements)\n"
        "- Water resources & environmental engineering\n"
        "- Construction planning, materials, and surveying\n\n"
        "RULES:\n"
        "- Answer ONLY within civil engineering domain.\n"
        "- Provide technically accurate, concise responses.\n"
        "- Avoid repetition and unnecessary verbosity.\n"
        "- Use structured output where suitable.\n"
        "- Do NOT provide legal, medical, or safety certification advice.\n"
        "- If data is insufficient, state assumptions clearly.\n"
        "- Keep responses suitable for a mobile or inspection app.\n"
        "- Prefer practical, field-relevant explanations."
    )
)


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    crack_data: Optional[Dict[str, Any]]


def chat_node(state: ChatState):
    """Process messages through the LLM with the system prompt."""
    messages = state.get("messages", [])
    crack_data = state.get("crack_data") or {}

    full_messages = [SYSTEM_PROMPT]

    # If crack analysis data is provided, inject it as context
    if crack_data:
        analysis_context = SystemMessage(
            content=(
                "Additional crack inspection data available (use if relevant):\n"
                f"- Crack width: {crack_data.get('width_mm', 'unknown')} mm\n"
                f"- Location: {crack_data.get('location', 'unknown')}\n"
                f"- Orientation: {crack_data.get('orientation', 'unknown')}\n"
                f"- Length: {crack_data.get('length_mm', 'unknown')} mm\n"
                f"- Progression: {crack_data.get('progression', 'unknown')}\n"
                "Use this data only when the user query relates to cracks or structural condition."
            )
        )
        full_messages.append(analysis_context)

    full_messages.extend(messages)
    response = llm.invoke(full_messages)
    return {"messages": [response]}


# Build a simple graph (no checkpointer = stateless)
graph_builder = StateGraph(ChatState)
graph_builder.add_node("chat", chat_node)
graph_builder.add_edge(START, "chat")
graph_builder.add_edge("chat", END)
chatbot_graph = graph_builder.compile()


def get_chat_response(messages: list[dict], crack_data: Optional[Dict[str, Any]] = None) -> str:
    """
    Takes a list of {"role": "user"|"assistant", "content": "..."} dicts,
    converts to LangChain messages, runs through the graph, and returns
    the assistant's response as a string.
    """
    lc_messages = []
    for msg in messages:
        if msg["role"] == "user":
            lc_messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            lc_messages.append(AIMessage(content=msg["content"]))

    result = chatbot_graph.invoke({"messages": lc_messages, "crack_data": crack_data})
    # The last message in the result is the AI response
    ai_response = result["messages"][-1]
    return ai_response.content
