import itchat
import math
import PIL.Image as Image
import os


itchat.auto_login(hotReload=True)
friends = itchat.get_friends(update=ture)[0:]
num = 0
for friend in friends:
