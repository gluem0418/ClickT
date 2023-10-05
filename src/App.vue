<script setup lang="ts">
import { ref } from 'vue';
import anime from 'animejs';
// import anime from 'animejs/lib/anime.es.d.ts';
// 背景インポート
import img_back1 from '@/assets/img/back/back1.jpg';
import img_back2 from '@/assets/img/back/back2.jpg';
import img_back3 from '@/assets/img/back/back3.jpg';
import img_back4 from '@/assets/img/back/back4.jpg';
import img_back5 from '@/assets/img/back/back5.jpg';
const aly_backimg = new Array(
  img_back1, img_back2, img_back3, img_back4, img_back5)

// キャラインポート
import img_boss1 from '@/assets/img/cha/boss1.png';
import img_boss2 from '@/assets/img/cha/boss2.png';
import img_boss3 from '@/assets/img/cha/boss3.png';
import img_boss4 from '@/assets/img/cha/boss4.png';
import img_boss5 from '@/assets/img/cha/boss5.png';
import img_cha1 from '@/assets/img/cha/cha1.png';
import img_cha2 from '@/assets/img/cha/cha2.png';
import img_cha3 from '@/assets/img/cha/cha3.png';
import img_cha4 from '@/assets/img/cha/cha4.png';
import img_cha5 from '@/assets/img/cha/cha5.png';
import img_cha6 from '@/assets/img/cha/cha6.png';
import img_cha7 from '@/assets/img/cha/cha7.png';
import img_cha8 from '@/assets/img/cha/cha8.png';
import img_cha9 from '@/assets/img/cha/cha9.png';
import img_cha10 from '@/assets/img/cha/cha10.png';
import img_cha11 from '@/assets/img/cha/cha11.png';
import img_cha12 from '@/assets/img/cha/cha12.png';
const aly_hit = new Array(
  img_boss1, img_boss2, img_boss3, img_boss4, img_boss5,
  img_cha1, img_cha2, img_cha3, img_cha4, img_cha5,
  img_cha6, img_cha7, img_cha8, img_cha9, img_cha10,
  img_cha11, img_cha12)

// 効果音（文字）インポート
import img_eft1 from '@/assets/img/effect/eft1.png';
import img_eft2 from '@/assets/img/effect/eft2.png';
import img_eft3 from '@/assets/img/effect/eft3.png';
import img_eft4 from '@/assets/img/effect/eft4.png';
import img_eft5 from '@/assets/img/effect/eft5.png';
import img_eft6 from '@/assets/img/effect/eft6.png';
const aly_imgeft = new Array(
  img_eft1, img_eft2, img_eft3, img_eft4, img_eft5, img_eft6,)

// BGMインポート
import msc_back1 from '@/assets/bgm/back/msc1.mp3';
import msc_back2 from '@/assets/bgm/back/msc2.mp3';
import msc_back3 from '@/assets/bgm/back/msc3.mp3';
import msc_back4 from '@/assets/bgm/back/msc4.mp3';
import msc_back5 from '@/assets/bgm/back/msc5.mp3';
import msc_back6 from '@/assets/bgm/back/msc6.mp3';
const aly_backmsc = new Array(
  msc_back1, msc_back2, msc_back3, msc_back4, msc_back5)

// 効果音インポート
import dwn_eft1 from '@/assets/bgm/effect/down/ax-slash-1.mp3';
import dwn_eft2 from '@/assets/bgm/effect/down/bomb1.mp3';
import dwn_eft3 from '@/assets/bgm/effect/down/boyoyon1.mp3';
import dwn_eft4 from '@/assets/bgm/effect/down/cannon1.mp3';
import dwn_eft5 from '@/assets/bgm/effect/down/pafu1.mp3';
import dwn_eft6 from '@/assets/bgm/effect/down/stupid5.mp3';
import dwn_eft7 from '@/assets/bgm/effect/down/stupid6.mp3';
import dwn_eft8 from '@/assets/bgm/effect/down/tin1.mp3';
import dwn_eft9 from '@/assets/bgm/effect/down/trumpet1.mp3';
const aly_eftdown = new Array(
  dwn_eft1, dwn_eft2, dwn_eft3, dwn_eft4, dwn_eft5,
  dwn_eft6, dwn_eft7, dwn_eft8, dwn_eft9)
// クリック時ハンマー
import hit_hummer from '@/assets/img/hummer.png';
// 効果音
import eft_apr from '@/assets/bgm/effect/apr1.mp3'; //出現
import eft_hit from '@/assets/bgm/effect/kick-light1.mp3'; //クリック時
import eft_anp from '@/assets/bgm/effect/anpunch1.mp3'; //アンパンチ
//特殊技
import eft_anpan from '@/assets/img/effect/punch1.gif';

// 出現時間（最大）
const num_aprMax = new Array(
  1500, 1300, 1100, 900, 700)
// 出現時間（最小）
const num_aprMin = new Array(
  800, 700, 600, 500, 400)
// 消える時間
const num_dsplist = new Array(
  4000, 3500, 3000, 2500, 2000)
// 大きくなるまでの時間
const num_extlist = new Array(
  3500, 3000, 2500, 2000, 1500)
// ボスの(HP)
const num_hplist = new Array(
  2, 2, 3, 3, 5)
// ゲームレベル
const aly_lvl = new Array(
  "EASY", "NORMAL", "HARD", "VERY HARD", "EXTREME")
// ゲーム時間
const end_time = 60000;
const int_time = 60;
// const end_time = 3000; 
// const int_time = 3;
// エフェクト音量
const vlm_back = 0.3;
const vlm_eft1 = 0.5;
const vlm_eft2 = 1;
const vlm_eft3 = 0.5;
const vlm_eft4 = 1;
// 特種技
const cnt_ult = 10;
const img_area = ref<HTMLDivElement | null>(null);

let isProcessing = ref(true);
let scoreText = ref(0);
let levelText = ref("EASY");
let time_cnt = ref("60")
let time_bar = ref(60)
let gameEnd = ref(false);

let msc_back = new Audio();
let msc_eft1 = new Audio(eft_apr);
// msc_eft1.src = eft_apr;
msc_eft1.volume = vlm_eft1;
let msc_eft2 = new Audio();
msc_eft2.volume = vlm_eft2;
let msc_eft3 = new Audio(eft_hit);
// msc_eft3.src = eft_hit; 
msc_eft3.volume = vlm_eft3;
let msc_eft4 = new Audio(eft_anp);
// msc_eft4.src = eft_anp;
msc_eft4.volume = vlm_eft4;
let aly_hp = new Array(5).fill(0);

// 背景設定
let num_lvl = 0;
let img_back = ref("url(" + aly_backimg[num_lvl] + ")");
// 型の宣言
let score: number;
let rdm_time: number;
let cnt_anpan: number;
let count: number;
let timeoutId: number;
let num_eft: number;
let timer: number;
let num_hit: number;

// ランダム整数取得
const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// ------------------------------------------------------------
// メイン処理
// ------------------------------------------------------------
function startGame() {
  // 初期処理
  score = 0;
  num_lvl = 0;
  rdm_time = 0;
  cnt_anpan = 0;
  count = int_time;
  timeoutId = 0;
  isProcessing.value = false;
  gameEnd.value = false;
  scoreText.value = 0;
  levelText.value = aly_lvl[num_lvl];
  num_eft = Math.floor(Math.random() * aly_eftdown.length);
  msc_eft2.src = aly_eftdown[num_eft];

  img_back.value = "url(" + aly_backimg[num_lvl] + ")";
  msc_back.src = aly_backmsc[num_lvl];
  msc_back.volume = vlm_back;
  msc_back.play();
  // カウントダウン処理
  timeoutId = window.setInterval(countdown, 1000);
  // ランダム表示
  rdm_time = Math.round(Math.random() * (num_aprMax[num_lvl] - num_aprMin[num_lvl])) + num_aprMin[num_lvl];
  timer = window.setTimeout(hithyoji, rdm_time);
  // 終了処理
  setTimeout(() => {
    clearTimeout(timer);
    isProcessing.value = true;
    img_area.value!.textContent = null;
    msc_back.src = msc_back6;
    msc_back.play();
    gameEnd.value = true;
  }, end_time)
};
// ------------------------------------------------------------
// カウントダウン
// ------------------------------------------------------------
function countdown() {
  time_bar.value = count;
  time_cnt.value = String(count);
  if (count <= 0) {
    time_cnt.value = "END";
    clearTimeout(timeoutId);
  }
  count--;
}
// ------------------------------------------------------------
// 画像のランダム表示
// ------------------------------------------------------------
function hithyoji() {
  // ランダム画像の選択
  num_hit = Math.floor(Math.random() * aly_hit.length);
  // BODY のノードリストに登録
  let img_hit = new Image();
  img_hit.id = String(num_hit);
  img_hit.src = aly_hit[num_hit];
  img_hit.style.position = "fixed";
  img_area.value!.appendChild(img_hit);
  // 出現範囲の設定
  let doc_width = document.body.clientWidth - 200;
  let doc_height = document.body.clientHeight - 150;
  let xpx = Math.floor(Math.random() * doc_width);
  let ypx = Math.floor(Math.random() * doc_height);
  // 画像の位置
  img_hit.style.left = xpx + "px";
  img_hit.style.top = ypx + "px";
  // フェードインで出現
  img_hit.animate([{ opacity: '0' }, { opacity: '1' }], 500);
  // 出現音
  msc_eft1.currentTime = 0;
  msc_eft1.play();
  // 秒後に拡大
  anime({
    targets: img_hit,
    translateX: [
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) }
    ],
    translateY: [
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) },
      { value: randRange(-50, 50), duration: randRange(500, 1000), delay: randRange(0, 100) }
    ],
    scale: 2,
    delay: num_extlist[num_lvl]
  });
  // 消えるまでの時間
  setTimeout(() => {
    img_hit.remove();
  }, num_dsplist[num_lvl]);
  // }
  // ランダム表示間隔　取得
  rdm_time = Math.round(Math.random() * (num_aprMax[num_lvl] - num_aprMin[num_lvl])) + num_aprMin[num_lvl];
  timer = window.setTimeout(hithyoji, rdm_time);
  // ------------------------------------------------------------
  // 画像をたたいた時の処理
  // ------------------------------------------------------------
  img_hit.addEventListener('click', (e) => {
    // 叩いた後の演出
    // 効果音
    msc_eft2.currentTime = 0;
    msc_eft2.play();
    // 効果音（文字）
    var img_eft = new Image();
    document.body.appendChild(img_eft);
    // ランダム画像の選択
    num_eft = Math.floor(Math.random() * aly_imgeft.length);
    img_eft.src = aly_imgeft[num_eft];
    img_eft.style.position = "absolute";
    // 出現範囲の設定
    img_eft.style.left = (e.clientX) + "px";
    img_eft.style.top = (e.clientY - 30) + "px";
    // 消えるまでの時
    setTimeout(() => {
      img_eft.remove();
    }, 500);
    // 鬼の場合、HP減
    num_hit = Number(img_hit.id);
    if (num_hit <= 4) {
      aly_hp[num_hit]++;
    }
    // 連続ヒットのカウント
    // if (num_hit == id_anpan) {
    cnt_anpan++;
    // カウントで特種技
    if (cnt_anpan == cnt_ult) {
      fncimgult();
      cnt_anpan = 0;
    }
    // }
    // 倒した後の処理
    if (num_hit > 4 || aly_hp[num_hit] >= num_hplist[num_hit]) {
      // 叩いた後の画像
      // img_hit.src = aly_itai[num_hit];
      // 叩かれた後のアニメーション
      anime({
        targets: img_hit,
        translateX: randRange(-500, 500),
        translateY: randRange(-500, 500),
        rotate: '1.5turn',
        duration: num_aprMax[num_lvl]
      });
      // 消えるまでの時間
      setTimeout(() => {
        img_hit.remove();
      }, num_aprMax[num_lvl]);
      // スコア加算
      if (num_hit > 4) {
        score++;
      } else {
        score += num_hplist[num_hit] * 2;
        aly_hp[num_hit] = 0;
      }
      // レベル判定
      fnclvlup1();
    }
  })
}
// ------------------------------------------------------------
// 特種技
// ------------------------------------------------------------
function fncimgult() {
  var img_ult = new Image();
  img_ult.src = eft_anpan + "?" + (new Date).getTime();
  img_ult.style.position = "fixed";
  document.body.appendChild(img_ult);
  img_ult.style.left = 40 + "px";
  img_ult.style.top = 50 + "px";
  // おたけび
  msc_eft4.play();
  // 効果音
  msc_eft2.currentTime = 0;
  // 全標的取得
  // var promise1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    msc_eft2.play();
    // 全標的を取得
    let aly_allhit: HTMLCollection
    aly_allhit = img_area.value!.getElementsByTagName('img');
    for (let i = 0; i < aly_allhit.length; i++) {
      anime({
        targets: aly_allhit[i],
        translateX: randRange(-500, 500),
        translateY: randRange(-500, 500),
        rotate: '1.5turn',
        duration: num_aprMax[num_lvl]
      });
      // スコア加算
      if (Number(aly_allhit[i].id) > 4) {
        score++;
      } else {
        score += aly_hp[Number(aly_allhit[i].id)] * 2;
        aly_hp[Number(aly_allhit[i].id)] = 0;
      }
      fnclvlup1();
    }
  }, 1400);
  // 秒後に消える
  setTimeout(() => {
    img_area.value!.textContent = null;
    img_ult.remove();
  }, 2100);
}
// ------------------------------------------------------------
// レベル判定
// ------------------------------------------------------------
function fnclvlup1() {
  scoreText.value = score;
  // レベル判定
  if (score >= 15 && num_lvl == 0) {
    num_lvl = 1;
    fnclvlup2();
  } else if (score >= 30 && num_lvl == 1) {
    num_lvl = 2;
    fnclvlup2();
  } else if (score >= 45 && num_lvl == 2) {
    num_lvl = 3;
    fnclvlup2();
  } else if (score >= 60 && num_lvl == 3) {
    num_lvl = 4;
    fnclvlup2();
  }
}
// ------------------------------------------------------------
// レベルアップ時
// ------------------------------------------------------------
function fnclvlup2() {
  img_back.value = "url(" + aly_backimg[num_lvl] + ")";
  msc_back.src = aly_backmsc[num_lvl];
  msc_back.play()
  levelText.value = aly_lvl[num_lvl];
  num_eft = Math.floor(Math.random() * aly_eftdown.length);
  msc_eft2.src = aly_eftdown[num_eft];
}
// ------------------------------------------------------------
// クリック時の処理
// ------------------------------------------------------------
document.onclick = function (e) {
  // 叩いた音
  msc_eft3.currentTime = 0;
  msc_eft3.play();
  // ------------------------------------------------------------
  // HTMLImageElement オブジェクトを作成する
  // ------------------------------------------------------------
  var img_hummer = new Image();
  img_hummer.src = hit_hummer;
  img_hummer.style.position = "fixed";
  document.body.appendChild(img_hummer);
  // ------------------------------------------------------------
  // 画像要素の位置を更新する
  // ------------------------------------------------------------
  img_hummer.style.left = (e.clientX - 40) + "px";
  img_hummer.style.top = (e.clientY - 40) + "px";
  // 画像の回転
  anime({
    targets: img_hummer,
    translateX: 0,
    translateY: 30,
    rotate: '-0.3turn',
    duration: 300,
    direction: 'normal'
  });
  // 500ミリ秒後に消える
  setTimeout(() => {
    img_hummer.remove();
  }, 300);
};

</script>

<template>
  <div class="field" id="field">
    <div class="box1">
      <span>SCORE:</span>
      <span>{{ scoreText }}</span>
    </div>
    <div class="box1">
      <span>{{ levelText }}</span>
    </div>
    <div class="box2">
      <label>TIME:</label>
      <output :value="time_cnt"></output>
      <span>&nbsp;</span>
      <progress :value="time_bar" max="60"></progress>
    </div>
    <div class="posi-stt">
      <button @click="startGame()" class="btn-start" v-show="isProcessing">START</button>
    </div>
    <div class="end-text" id="game-end" v-show="gameEnd">GAME END</div>
    <div class="end-text" id="score-end" v-show="gameEnd">
      <span>SCORE:</span>
      <span>{{ scoreText }}</span>
    </div>
    <div class="container" ref="img_area"> </div>
  </div>
</template>

<style scoped>
.field {
  background-image: v-bind(img_back);
  background-repeat: no-repeat;
  background-position: center top;
  height: 100vh;
  /* width: 100%; */
  /* max-width: 1024px; */
  /* margin: auto; */
  text-align: center;
  background-size: cover;
  font-family: sans-serif;
  font-size: 24px;
}

.field:hover {
  cursor: url(@/assets/img/hummer.cur) 40 40, auto;
}

.box1 {
  color: #FFFF99;
  background: #000050;
  /* border: solid 4px #fd9535; */
  border: solid 3px #FFFF99;
  /*丸み*/
  border-radius: 15px;
  /*角の丸み*/
  float: left;
  /* width: 150px; */
  padding: 5px 10px;
  margin: 5px;
  animation: slide 2s;
}

.box2 {
  color: #FFFF99;
  background: #000050;
  border: solid 3px #FFFF99;
  /*線*/
  border-radius: 15px;
  /*角の丸み*/
  float: left;
  /* width: 330px; */
  padding: 5px 10px;
  margin: 5px;
  animation: slide 2.5s;
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(500px);
  }

  100% {
    opacity: 1;
  }
}

progress {
  width: 180px;
  /* background-color: orange; */
}

.posi-stt {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 70%;
  left: 50%;
}

.btn-start {
  /* bottom:; */
  padding: 10px 30PX;
  margin: 5px 10px;
  font-family: fantasy;
  font-size: 56px;
  text-decoration: none;
  color: #FFFF99;
  border-radius: 30px;
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
  border: solid 5px #101060;
  border-bottom: solid 10px #101040;
  animation: skew 3s;
  background: repeating-linear-gradient(30deg, rgba(40, 0, 240, 1), rgba(128, 66, 180, 1) 36%, rgba(165, 93, 148, 1) 64%, rgba(255, 160, 71, 1));
  ;
  -webkit-text-stroke: 2px #000050;
}

/* CSSアニメーションの設定 */
@keyframes skew {
  0% {
    opacity: 0;
    transform: skew(100deg, 100deg);
  }

  100% {
    opacity: 1;
  }
}

progress {
  width: 180px
}

.end-text {
  font-size: 56px;
  font-weight: bold;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%, -50%);
}

#game-end {
  top: 40%;
  left: 50%;
  color: #FFFF99;
  -webkit-text-stroke: 2px #000050;
}

#score-end {
  top: 52%;
  left: 50%;
  color: transparent;
  background: repeating-linear-gradient(40deg, #B67B03 0.1em, #DAAF08 0.2em, #FEE9A0 0.3em, #DAAF08 0.4em, #B67B03 0.5em);
  -webkit-background-clip: text;
  -webkit-text-stroke: 2px #000050;
}

.container {
  width: 10px;
  height: 10px;
  display: flex;
}</style>