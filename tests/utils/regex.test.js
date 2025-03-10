import test from 'node:test'
import assert from 'node:assert/strict'
import {
  startHtmlRegex,
  markdownHeaderRegex,
  headTagRegex,
  titleTagRegex,
  endHeadTagRegex,
  pageContentRegex,
  projectTitleRegex
} from '../../utils/regex.js'

test('startHtmlRegex should match opening <html> tag with optional attributes', () => {
  assert.ok(startHtmlRegex.test('<html>'))
  assert.ok(startHtmlRegex.test('<html lang="en">'))
  assert.ok(startHtmlRegex.test('<html data-test="123">'))
  assert.ok(!startHtmlRegex.test('<body>'))
})

test('markdownHeaderRegex should match markdown-style HTML comments', () => {
  assert.ok(markdownHeaderRegex.test('<!-- This is a comment -->'))
  assert.ok(markdownHeaderRegex.test('<!--Another comment-->'))
  assert.ok(markdownHeaderRegex.test('<!-- Multiline\n Comment -->'))
  assert.ok(!markdownHeaderRegex.test('<!DOCTYPE html>'))
})

test('headTagRegex should match <head> section with content', () => {
  assert.ok(headTagRegex.test('<head><title>Test</title></head>'))
  assert.ok(headTagRegex.test('<head lang="en"><meta charset="UTF-8"></head>'))
  assert.ok(!headTagRegex.test('<body><h1>Title</h1></body>'))
})

test('titleTagRegex should match <title> tag content', () => {
  assert.ok(titleTagRegex.test('<title>My Page</title>'))
  assert.ok(titleTagRegex.test('<title lang="en">Test</title>'))
  assert.ok(!titleTagRegex.test('<h1>My Page</h1>'))
})

test('endHeadTagRegex should match closing </head> tag', () => {
  assert.ok(endHeadTagRegex.test('</head>'))
  assert.ok(!endHeadTagRegex.test('<head>'))
})

test('pageContentRegex should match <!-- page_content --> marker', () => {
  assert.ok(pageContentRegex.test('<!-- page_content -->'))
  assert.ok(pageContentRegex.test('<!--page_content-->'))
  assert.ok(!pageContentRegex.test('<h1>page_content</h1>'))
})

test('projectTitleRegex should match valid project titles', () => {  
  assert.ok(projectTitleRegex.test('My Project'))
  assert.ok(projectTitleRegex.test('Valid123'))
  assert.ok(!projectTitleRegex.test('This title is way too long to be valid'))
  assert.ok(!projectTitleRegex.test('<Invalid>'))
  assert.ok(!projectTitleRegex.test(''))
})
