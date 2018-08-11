from scrapy.cmdline import execute
#import scrapy.cmdline
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

execute(['scrapy','crawl','test'])

#scrapy.cmdline.execute(['scrapy','crawl','jobbole'])