---
title: 'Enemy Nodepool'
disqus: hackmd
---

Enemy Design
===


## Link

[TOC]

## Enemy movement

小怪會追蹤玩家(有追蹤範圍)，並朝玩家的方向移動
實現方式: 計算小怪node和玩家node的位置偏差，來給小怪速度向量



## Enemy nodepool
利用 nodepool 來讓小怪能一直生成
[Demo video](https://drive.google.com/drive/folders/1UyULm_TUL4Ra1JzInur704j3IOqJfHAo?usp=sharing)(demo影片中，設計在地圖的四個角落生成小怪，並追蹤玩家前進，碰到玩家就回收node到nodepool中，再重新生成)

## Enemy spawn
計畫紀錄地圖的特定位置(可能4個以上)來生成小怪(利用Math.random來隨機生成)