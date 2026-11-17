"""Drive SnipX v7.20.9 and grab real screenshots of its UI.

Captures the full virtual desktop with the Windows GDI/DWM path so SnipX's
own overlay, selection band and toolbar are included (a plain PrintWindow
on the desktop would miss the layered overlay).

Usage:
    python -I snipx_shots.py <command> [args]

Commands:
    minimize              Win+D (show desktop)
    restore               Win+D again (restore windows)
    grab <out.png>        Full-screen grab to PNG
    key <VK>              Send a virtual-key tap (e.g. F1, ESC, ENTER)
    drag x1 y1 x2 y2      Left-button drag in physical pixels
    click x y             Left click
    move x y              Move cursor only
    fglist                Print the current foreground window title
"""

import ctypes
import ctypes.wintypes as wt
import sys
import time

user32 = ctypes.windll.user32
gdi32 = ctypes.windll.gdi32
shcore = ctypes.windll.shcore

# Report true pixels on a HiDPI display instead of the virtualized 96-DPI view.
try:
    shcore.SetProcessDpiAwareness(2)
except Exception:
    try:
        user32.SetProcessDPIAware()
    except Exception:
        pass

SM_XVIRTUALSCREEN, SM_YVIRTUALSCREEN = 76, 77
SM_CXVIRTUALSCREEN, SM_CYVIRTUALSCREEN = 78, 79
SRCCOPY = 0x00CC0020
CAPTUREBLT = 0x40000000

VK = {
    "F1": 0x70, "F2": 0x71, "F3": 0x72, "F4": 0x73,
    "ESC": 0x1B, "ENTER": 0x0D, "SPACE": 0x20, "TAB": 0x09,
    "LWIN": 0x5B, "D": 0x44, "A": 0x41, "C": 0x43, "T": 0x54,
    "CTRL": 0x11, "SHIFT": 0x10, "ALT": 0x12,
}

KEYEVENTF_KEYUP = 0x0002
MOUSEEVENTF_LEFTDOWN = 0x0002
MOUSEEVENTF_LEFTUP = 0x0004
MOUSEEVENTF_RIGHTDOWN = 0x0008
MOUSEEVENTF_RIGHTUP = 0x0010


def virtual_rect():
    return (
        user32.GetSystemMetrics(SM_XVIRTUALSCREEN),
        user32.GetSystemMetrics(SM_YVIRTUALSCREEN),
        user32.GetSystemMetrics(SM_CXVIRTUALSCREEN),
        user32.GetSystemMetrics(SM_CYVIRTUALSCREEN),
    )


def grab(path):
    """Grab the whole virtual screen.

    Uses PIL.ImageGrab, which goes through the DWM-composited path. A direct
    GDI BitBlt on the screen DC returns an all-black buffer on this machine
    (desktop composition does not expose the composed frame to GDI there),
    so the GDI route is not usable even with CAPTUREBLT.
    """
    from PIL import ImageGrab
    img = ImageGrab.grab(all_screens=True)
    img.convert("RGB").save(path, "PNG")
    print(f"saved {path} {img.width}x{img.height}")


def tap(vk, hold=0.04):
    user32.keybd_event(vk, 0, 0, 0)
    time.sleep(hold)
    user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, 0)


def combo(mods, vk, hold=0.05):
    """Hold modifier keys, tap vk, release modifiers (e.g. Ctrl+C)."""
    for m in mods:
        user32.keybd_event(m, 0, 0, 0)
        time.sleep(0.03)
    tap(vk, hold)
    for m in reversed(mods):
        user32.keybd_event(m, 0, KEYEVENTF_KEYUP, 0)
        time.sleep(0.03)


def show_desktop():
    user32.keybd_event(VK["LWIN"], 0, 0, 0)
    tap(VK["D"])
    user32.keybd_event(VK["LWIN"], 0, KEYEVENTF_KEYUP, 0)


def drag(x1, y1, x2, y2, steps=28):
    user32.SetCursorPos(x1, y1)
    time.sleep(0.12)
    user32.mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
    time.sleep(0.08)
    for i in range(1, steps + 1):
        user32.SetCursorPos(
            int(x1 + (x2 - x1) * i / steps),
            int(y1 + (y2 - y1) * i / steps),
        )
        time.sleep(0.012)
    time.sleep(0.12)
    user32.mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)


def click(x, y, right=False):
    user32.SetCursorPos(x, y)
    time.sleep(0.1)
    if right:
        user32.mouse_event(MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0)
        time.sleep(0.05)
        user32.mouse_event(MOUSEEVENTF_RIGHTUP, 0, 0, 0, 0)
    else:
        user32.mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
        time.sleep(0.05)
        user32.mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)


def foreground_title():
    hwnd = user32.GetForegroundWindow()
    n = user32.GetWindowTextLengthW(hwnd)
    buf = ctypes.create_unicode_buffer(n + 1)
    user32.GetWindowTextW(hwnd, buf, n + 1)
    print(f"hwnd={hwnd} title={buf.value!r}")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "minimize" or cmd == "restore":
        show_desktop()
    elif cmd == "grab":
        grab(sys.argv[2])
    elif cmd == "key":
        tap(VK[sys.argv[2].upper()])
    elif cmd == "combo":
        mods = [VK[k.upper()] for k in sys.argv[2].split("+")]
        combo(mods[:-1], mods[-1])
    elif cmd == "drag":
        drag(*map(int, sys.argv[2:6]))
    elif cmd == "click":
        right = len(sys.argv) > 4 and sys.argv[4] == "right"
        click(int(sys.argv[2]), int(sys.argv[3]), right)
    elif cmd == "move":
        user32.SetCursorPos(int(sys.argv[2]), int(sys.argv[3]))
    elif cmd == "fglist":
        foreground_title()
    else:
        raise SystemExit(f"unknown command {cmd}")

