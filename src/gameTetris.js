;(function (window) {

    var WzwScreen = window.WzwScreen;
    var GAME_STATUS = {
        PLAYING: "playing",  // 正在游戏中
        PAUSE:   "pause",    // 暂停了
        OVER:    "over"      // 游戏结束
    }
    var STUFS = [
            [
            [0, 0, 0, 0], /* 长条 */
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 长条 */
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]], [

            [0, 1, 0, 0], /* 长条 */
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]], [

            [0, 1, 0, 0], /* 长条 */
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]], [

            // ------------------------------------------------

            [0, 0, 0, 0], /* 四块 */
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 四块 */
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 四块 */
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 四块 */
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            // ------------------------------------------------

            [0, 0, 0, 0], /* 翻7 */
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 翻7 */
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]], [

            [0, 0, 0, 0], /* 翻7 */
            [0, 1, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 翻7 */
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0]], [

            // ------------------------------------------------

            [0, 0, 0, 0], /* 正7 */
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 正7 */
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]], [

            [0, 0, 0, 0], /* 正7 */
            [0, 0, 0, 1],
            [0, 1, 1, 1],
            [0, 0, 0, 0]], [

            [0, 1, 0, 0], /* 正7 */
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [


            // ------------------------------------------------

            [0, 0, 0, 0], /* 土 */
            [0, 1, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 土 */
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]], [

            [0, 0, 0, 0], /* 土 */
            [0, 0, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 土 */
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 0]], [


            // ------------------------------------------------

            [0, 0, 0, 0], /* z */
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* z */
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* z */
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]], [

            [0, 0, 0, 0], /* z */
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]], [


            // ------------------------------------------------

            [0, 0, 0, 0], /* 翻z */
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 翻z */
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]], [

            [0, 0, 0, 0], /* 翻z */
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]], [

            [0, 0, 0, 0], /* 翻z */
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]]
    ];
    /* 定义了各个等级下降的速度， 实际上数字用于settimeout时间间隔 */
    var LEVELS = [800, 700, 600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 130, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];

    /* 成绩对应等级 */
    var SCORE_LEVELS = {
        "50":  1,
        "100": 2,
        "150": 3,
        "200": 4,
        "250": 5,
        "300": 6,
        "350": 7,
        "400": 8,
        "450": 9,
        "500": 10,
        "550": 11,
        "600": 12,
        "700": 13,
        "850": 14,
        "1000": 15,
        "1100": 16,
        "1300": 17,
        "1500": 18,
        "2000": 19,
        "2500": 20,
        "3000": 21,
        "4000": 22,
        "5000": 23
    };
    var STUFF_OFFSET_ROW = -3;
    var STUFF_OFFSET_COL = 3;

    /**
     * 王中王游戏实现。
     * @constructor
     */
    function Tetris() {
        // 初始化游戏预览。
        initPreview.call(this);
    }

    // 当游戏实列被注册到launch时调用。
    Tetris.prototype.onRegLaunch = function (launch) {
        this.launch = launch;
    };

    Tetris.prototype.getPreviewAtoms = function () {
        if (Date.now() - this.preview_lasttime >= this.preview_timespace) {
            this.preview_index++;
            if (this.preview_index >= this.previewAtom.length - 1) {
                this.preview_index = 0;
            }
            this.preview_lasttime = Date.now();
        }
        return this.previewAtom[this.preview_index];
    };

    // 重置游戏。
    Tetris.prototype.reset = function () {

        // 初始化游戏数组
        this.atoms = this.launch.screen.makeNewArr();

        // 初始化堆砌结果数组
        this.atomsed = this.launch.screen.makeNewArr();

        // 当前等级
        this.level = 0;

        // 初始化当前材料
        this.stuff = null;
        this.stuffOffsetRow = STUFF_OFFSET_ROW;
        this.stuffOffsetCol = STUFF_OFFSET_COL;

        // 初始化下一个材料
        this.nextStuff = null;

        this.gameLastTime = 0;

        // 初始状态为游戏结束。
        this.status = GAME_STATUS.OVER;
    };

    // 游戏启动时调用此方法
    Tetris.prototype.onLaunch = function () {
        this.reset();
        this.stuff = getRandomStuff.call(this);
        // 初始化下一个材料
        this.nextStuff = getRandomStuff.call(this);
        this.status = GAME_STATUS.PLAYING;
    };

    // 此方法会在游戏过程中不停调用。
    Tetris.prototype.onUpdate = function () {
        var _this = this;
        if (!_this.atoms) return ;

        // 根据当前游戏等级来更新数据。
        if ((Date.now() - _this.gameLastTime) > LEVELS[_this.level]) {
            if (_this.status === GAME_STATUS.PLAYING) {

                _this.atoms = _this.launch.screen.makeNewArr(function (r, c) {
                    return _this.atomsed[r][c];
                });
                try {
                    if (_this.stuffUsed) {
                        // 材料被使用了，初始化新的材料。
                        _this.stuff = _this.nextStuff;
                        _this.nextStuff = getRandomStuff.call(_this);
                        _this.stuffOffsetRow = STUFF_OFFSET_ROW;
                        _this.stuffOffsetCol = STUFF_OFFSET_COL;
                    }
                    _this.stuffUsed = merge.call(_this, _this.atoms, _this.stuff, _this.stuffOffsetRow, _this.stuffOffsetCol);

                    if (!_this.stuffUsed){
                        // 材料没被使用，继续下降。
                        _this.stuffOffsetRow += 1;
                    } else {
                        _this.atomsed = _this.atoms;
                    }
                } catch (e) {
                    if (e.message === "gameover") {
                        // 游戏结束
                        _this.status = GAME_STATUS.OVER;
                        doGameOver.call(_this);
                    } else {
                        console.error(e);
                    }
                }

            } else if (_this.status === GAME_STATUS.PAUSE) {
                // 游戏已暂停了。

            } else if (_this.status === GAME_STATUS.OVER) {

            }


            _this.gameLastTime = Date.now();
        }

        return _this.atoms;
    };

    // 此方法会在游戏过程中不停调用，返回一个4x4的点阵，将绘制在右侧点阵状态里。
    Tetris.prototype.onUpdateStatus = function () {
        return this.nextStuff;
    };

    // 暂停游戏，暂停游戏时不展示下一个材料
    Tetris.prototype.pause = function () {
        if (this.status === GAME_STATUS.PLAYING) {
            this.status = GAME_STATUS.PAUSE;
            this.tempNextStuff = this.nextStuff;
            this.nextStuff = null;
        } else {
            this.status = GAME_STATUS.PLAYING;
            this.nextStuff = this.tempNextStuff;
            this.tempNextStuff = null;
        }

    }

    // 此方法在按下对应按钮时会执行。
    Tetris.prototype.onKeypress = function (key) {
        // 按下了复位按钮，就让游戏暂停。使得界面不动。
        if ("reset" === key) {
            this.pause();
        }
    }

    // 此方法当用户按复位时，动画执行到满屏，会调用，游戏应该清除自己的状态。
    Tetris.prototype.onDestroy = function () {
        this.reset();
    }

    // 游戏结束时执行此方法
    function doGameOver() {
        var _this = this;
        _this.launch.screen.playAnim(WzwScreen.ANIM.B2T, function (animName, index) {
            if (index === 0) {
                _this.reset();
                _this.launch.exitCurentGame(); // 退出当前游戏
            }
        });
    }

    // 合并正在下降的材料。返回true表示此材料被消耗(到底了，或则堆砌到了已堆砌的材料上)
    function merge(atoms, stuff, offsetRow, offsetCol) {
        var _this = this;
        var grounded = false;
        WzwScreen.mergeArr(stuff, atoms, offsetRow, offsetCol, function (tarRowIndex, tarColIndex, rowI, colI) {

            var tarVal = atoms[tarRowIndex][tarColIndex];
            var srcVal = stuff[rowI][colI];

            if (tarVal && srcVal) {
                // 发现一处都有点阵，说明这是堆砌到顶部，当前材料已没有合适的位置摆放，直接爆出错误。gameover。
                throw new Error("gameover");
            }

            if (!grounded) {
                // 判断是否触底
                var nexTarRow = tarRowIndex + 1;
                if (srcVal === 1) {
                    if (nexTarRow >= _this.launch.screen.option.atomRowCount) {
                        grounded = true;
                    } else if (_this.atomsed[nexTarRow][tarColIndex] === 1) {
                        grounded = true;
                    }
                }
            }

            return srcVal || tarVal;
        });

        return grounded;
    }

    // 获取一个随机下落的材料
    function getRandomStuff() {
        return [].concat(STUFS[WzwScreen.random(0, STUFS.length)]);
    }

    // 初始化预览界面。
    function initPreview () {

        this.preview_index = 0;
        this.preview_lasttime = Date.now();
        this.preview_timespace = 200;

        // 预览界面是一个row=10，col=11的二维数组。
        this.previewAtom = [
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]],
        ];
    }

    window.Tetris = Tetris;
})(window);
