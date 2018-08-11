# -*- coding: utf-8 -*-
import re
import scrapy
from urllib import parse
from scrapy.http import Request
from Scrapy.items import demo
from scrapy.selector import Selector
from scrapy.http import HtmlResponse


class TestSpider(scrapy.Spider):
    name = 'test'
    #allowed_domains = ['blog.jobbole.com']
    start_urls = ['https://github.com/facebook']


    def parse(self, response):
        post_nodes = response.css('.d-inline-block.mb-1 a')
        test = response.css(".d-inline-block.mb-1 a font font::test")
        print(test)
        for post_node in post_nodes:
            post_url = post_node.css('::attr(href)').extract_first('')
            yield Request(
                url=parse.urljoin(response.url, post_url),
                callback=self.parse_detail
            )
        next_url = response.css('.next_page::attr(href)').extract_first(
            '')
        if next_url:
            yield Request(
                url=parse.urljoin(response.url, next_url),
                callback=self.parse
            )






    def parse_detail(self, response):
        title = response.css('.repository-meta-content font '
                             'span a font::text').extract_first('')
        print(title)

        article_Item = demo()
        article_Item["title"] = title

        yield article_Item
