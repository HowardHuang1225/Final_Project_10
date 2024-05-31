const { ccclass, property } = cc._decorator;

@ccclass
export class MonsterManager extends cc.Component {
    // @property(cc.Prefab)
    // exp: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab0: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab1: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab2: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab3: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab4: cc.Prefab = null;

    @property(cc.Node)
    monsterParent: cc.Node = null;

    private monsterPool: cc.NodePool;

    onLoad() {
        // 初始化怪物节点池
        this.monsterPool = new cc.NodePool();
        // 预先创建大量节点放入池中
        for (let i = 0; i < 400; i++) {
            let a = Math.floor(Math.random() * 5) + 1
            let monster;
            switch (a) {
                case 1:
                    monster = cc.instantiate(this.monsterPrefab0);
                    break;
                case 2:
                    monster = cc.instantiate(this.monsterPrefab1);
                    break;
                case 3:
                    monster = cc.instantiate(this.monsterPrefab2);
                    break;
                case 4:
                    monster = cc.instantiate(this.monsterPrefab3);
                        break;
                case 5:
                    monster = cc.instantiate(this.monsterPrefab4);
                        break;
                default:
                    break;
            }
            
            this.monsterPool.put(monster);
        }
    }

    start() {
        // 一次性生成 200 只怪物
        // for (let i = 0; i < 15; i++) {
        //     this.spawnMonster();
        // }
        this.schedule(this.spawnMonster, 0.5);
    }

    spawnMonster() {
        let monster: cc.Node = null;
        if (this.monsterPool.size() > 0) {
            // 如果池中有节点，从池中取出
            monster = this.monsterPool.get();
        } else {
            // 如果池中没有节点，创建新的节点
            return
        }
        // 将怪物节点添加到场景中
        this.monsterParent.addChild(monster);
        // 设置怪物的位置
        monster.setPosition(this.getNewMonsterPosition());

        // 重置怪物
        // monster.getComponent('Monster').scheduleDestroyAndRespawn();
    }

    getNewMonsterPosition(): cc.Vec2 {
        // 返回新怪物生成的位置，可以根据需求自定义
        let x = Math.floor(Math.random() * 8) + 1
        let y = Math.floor(Math.random() * 4) + 1
        let randX = 500;
        let randY = 500;

        if(x===2){
            randY = -500;
            randX = 500;
        }
        else if(x===3){
            randY = 500;
            randX = -500;
        }
        else if(x===4){
            randY = -500;
            randX = -500;
        }
        else if(x===5){
            randY = 250;
            randX = -500;
        }
        else if(x===6){
            randY = 250;
            randX = 500;
        }
        else if(x===7){
            randY = 500;
            randX = -250;
        }
        else if(x===8){
            randY = 500;
            randX = 250;
        }
        else if(x===8){
            randY = -250;
            randX = -500;
        }

        randY += y*3;
        randX += y*3;
        
        return cc.v2(randX, randY);
    }

    recycleMonster(monster: cc.Node) {
        // 回收怪物节点，放回池中
        monster.removeFromParent(false);
        this.monsterPool.put(monster);
        // cc.instantiate(this.exp)
    }
}
