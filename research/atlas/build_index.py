import os
import json
from natsort import natsorted
import pandas as pd
import re

ROOT = "research/devatlas/data/MortX_Fresh"
OUT = "research/devatlas/data"


index = {}

for age in natsorted(os.listdir(ROOT)):
    age_path = os.path.join(ROOT, age)
    if not os.path.isdir(age_path):
        continue

    index[age] = {}

    for animal in natsorted(os.listdir(age_path)):
        animal_path = os.path.join(age_path, animal)
        if not os.path.isdir(animal_path):
            continue

        channels = {}

        for section in natsorted(os.listdir(animal_path)):
            section_path = os.path.join(animal_path, section)
            if not os.path.isdir(section_path):
                continue

            files = os.listdir(section_path)
            atlas = next((f for f in files if f == "atlas_new.png"), None)
            if not atlas:
                continue

            # Filter image files excluding atlas (both jpg and png)
            image_files = [f for f in files if (f.endswith(".png") or f.endswith(".jpg")) and f != atlas]

            for f in image_files:
                # Split the filename by underscores
                parts = f.split("_")
                
                if len(parts) > 1 and parts[0].startswith("C"):
                    # Normal channel prefix (C1_, C2_, etc.)
                    channel = parts[0].split("-")[0]
                else:
                    # Single file or no channel prefix → use last part as channel
                    channel = os.path.splitext(parts[-1])[0]  # remove .jpg or .png

                channels.setdefault(channel, []).append({
                    "image": f,
                    "atlas": atlas,
                    "path": f"MortX_Fresh/{age}/{animal}/{section}"
                })

        if channels:
            sorted_channels = {}

            for ch in natsorted(channels.keys()):
                sorted_channels[ch] = natsorted(
                    channels[ch],
                    key=lambda x: (x["path"], x["image"])
                )

            index[age][animal] = {
                "channels": sorted_channels
            }

os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, "index.json"), "w") as f:
    json.dump(index, f, indent=2)

print("✅ index.json generated successfully")

## Building regions.json

XLSX_PATH = "research/devatlas/data/MortX_Fresh/Updated_Cortical_Atlas_MortX_Labels.xlsx"
OUT_PATH = "research/devatlas/data/regions.json"

AGES = {
    "P4": "RGB_P4",
    "P14": "RGB_P14",
    "P56": "RGB_P56",
}



def parse_rgb(val):
    """
    Accepts:
    - '255,0,0'
    - '255 0 0'
    - [255, 0, 0]
    - NaN
    """
    if pd.isna(val):
        return None

    if isinstance(val, (list, tuple)):
        return ",".join(map(str, val))

    s = str(val)
    nums = re.findall(r"\d+", s)
    if len(nums) != 3:
        return None

    return ",".join(nums)

# Read Excel
df = pd.read_excel(XLSX_PATH, engine="openpyxl")

regions = {age: {} for age in AGES}

for _, row in df.iterrows():
    region = str(row["Region"]).strip()
    layer = str(row["Layer"]).strip() if not pd.isna(row["Layer"]) else ""

    label = region if not layer else f"{region} ({layer})"

    for age, col in AGES.items():
        rgb = parse_rgb(row.get(col))
        if rgb:
            regions[age][rgb] = label

# Ensure output directory exists
os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(regions, f, indent=2, ensure_ascii=False)

print("✅ regions.json generated successfully")
for age in regions:
    print(f"  {age}: {len(regions[age])} regions")

