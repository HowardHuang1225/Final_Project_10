# Final_Project_10

## Scene Size [960*640]

## FlowChart

* Start (Window) <- Finish
  * item
      signup(Jump Window)
      signin(Jump Window)
      guest -> Menu
      Back(End Game)

* Menu (Window)
  * item
      Stage Choose(Jump Window)
      Setting Button(Jump Window)
      History Button(Window)
      Player Closet(Window / Animation + New)

      Start -> Defult Stage Window
      Back -> Start

* Setting (Jump Window - Prefab)
  * item
      Bgm voice
      Effect voice
      Back(Close setting)

* History (Window)
  * item
      Best Score
      Ranking
      (login button ?)
      Back -> Menu
    
* Target (Window)
  * item
      Stage Arrived
      (Skip Button Here)
  * Extra Target
      1. Hit total 1000 enemy (exclude boss)
      2. Fail for 10 Times

<!-- * Stage Choose (Jump Window - Prefab) <- NONE
  * item
      Different Stage(Preview)
        -> Start(Click Stage Preview)
      Back(Close stage choose) -->
<!-- * Player Closet (Window)
  * item
      Player preview
      Back -> Menu -->

* Game Stage
  * item
      Game Setting(Jump window)

* Win Scene(True)
  *item 
    ESC(End Game)
    Back -> Menu

* Win Scene2(Normal)
  * Have an ANIMATION
  *item 
    ESC(End Game)
    Back -> Menu

* Lose Scene(If the player Die 5 Times in the Game)
  *item
    Score (And show the Best Score)
    Back(End Game)
    Back -> Menu
      
* OTHER 