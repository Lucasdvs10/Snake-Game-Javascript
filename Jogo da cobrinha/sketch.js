var pontuação = 0;

function setup() {
  createCanvas(400,400);
  comida = new Comida();
  robber = new Cobra();
}


function draw(){
  frameRate(15)
  robber.faztudo();
  placar();
  textSize(30)
  text('Pontos: '+ pontuação,10,30);
  comida.revive();
  comida.faztudo();
}

class Comida {
  constructor() {
    this.altura = 7;
    this.posicao = new p5.Vector(random(width - (this.altura + 8)),random(height - (this.altura + 8)));
    this.vive = true;
  }
  mostrar(){
    fill(255,0,0);
    rect(this.posicao.x,this.posicao.y,this.altura,this.altura);
  }
  morre(obj){
    if(dist(this.posicao.x,this.posicao.y,obj.posicao.x,obj.posicao.y)<this.altura){
      this.vive = false
    }
  }
  revive(){
    if(!this.vive){
      this.posicao = new p5.Vector(random(width - this.altura),random(height - this.altura));
      this.vive = true
    }
  }
  faztudo(){
    this.morre(robber);
    this.mostrar();
  }
}

function placar(){
    if(!comida.vive){
      pontuação++
    }
}
