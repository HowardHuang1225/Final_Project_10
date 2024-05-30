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

* Stage Choose (Jump Window - Prefab)
  * item
      Different Stage(Preview)
        -> Start(Click Stage Preview)
      Back(Close stage choose)

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

* Player Closet (Window)
  * item
      Player preview
      Back -> Menu

* Game Stage
  * item
      Game Setting(Jump window)

* Win Scene
  *item 
    Score (And show the Best Score)
      => if player renew the best score -> ANIMATION(?)
      => if player renew the ranking -> ANIMATION(?)
      => if player get any new things in the game -> jump
    Back(End Game)
    Back -> Menu

* Lose Scene
  *item
    Score (And show the Best Score)
    Back(End Game)
    Back -> Menu
      
* OTHER 