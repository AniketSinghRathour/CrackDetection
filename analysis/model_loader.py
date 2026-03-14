import os
import torch
import torch.nn as nn

device = "cuda" if torch.cuda.is_available() else "cpu"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class UNet(nn.Module):

    def __init__(self):
        super().__init__()

        def block(in_c, out_c):
            return nn.Sequential(
                nn.Conv2d(in_c, out_c, 3, padding=1),
                nn.ReLU(inplace=True),
                nn.Conv2d(out_c, out_c, 3, padding=1),
                nn.ReLU(inplace=True)
            )

        self.enc1 = block(3, 64)
        self.enc2 = block(64, 128)
        self.enc3 = block(128, 256)

        self.pool = nn.MaxPool2d(2)

        self.dec2 = block(256 + 128, 128)
        self.dec1 = block(128 + 64, 64)

        self.final = nn.Conv2d(64, 1, 1)

    def forward(self, x):

        c1 = self.enc1(x)
        c2 = self.enc2(self.pool(c1))
        c3 = self.enc3(self.pool(c2))

        u2 = torch.nn.functional.interpolate(c3, scale_factor=2, mode="bilinear")
        u2 = self.dec2(torch.cat([u2, c2], dim=1))

        u1 = torch.nn.functional.interpolate(u2, scale_factor=2, mode="bilinear")
        u1 = self.dec1(torch.cat([u1, c1], dim=1))

        return torch.sigmoid(self.final(u1))


model = UNet().to(device)

checkpoint = torch.load(os.path.join(BASE_DIR, "crack_unet_checkpoint.pth"), map_location=device)

model.load_state_dict(checkpoint)

model.eval()