def create_type_scale(base, scale, max):
    curr = round(base / scale)
    out = ""
    for i in range(max, 0, -1):
        out += f"\t\t--fs-{i}: {curr}px;\n"
        curr = round(curr * scale)
    return out

def create_media(device, values):
    return f"\t@media ${{device.{device}}} {{\n{create_type_scale(*values)}\t}}\n\n"

# Definiere die Daten in einem Dictionary
size = 6
font_data = {
    "desktopXL":    (16, 1.333,   size),
    "desktop":      (16, 1.25, size),
    "laptop":       (16, 1.2,   size),
    "tablet":       (16, 1.125,  size),
    "tablet_sm":    (16, 1.08,  size),
    "mobile":       (16, 1.067,   size)
}

with open("typescale.js", "w+") as cssfile:
    head = "import { css } from 'styled-components';\nimport { device } from './breakpoints';\n\nexport default css`\n  :root {\n"
    footer = "}\n`;"
    dynamic = ""
    
    for device, values in font_data.items():
        dynamic += create_media(device, values)
    
    cssfile.write(head + dynamic + footer)