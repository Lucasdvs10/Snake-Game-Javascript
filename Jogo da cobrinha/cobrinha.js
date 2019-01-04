class Cobra {
  constructor() {
    this.posicao = new p5.Vector(width/2,height/2);
    this.posicao_anterior = [this.posicao];
    this.vel1 = new p5.Vector(0,0); //direção
    this.velocidade = 8
    this.comprimento = 8
    this.cima = true
    this.baixo = true
    this.esquerda = true
    this.direita = true
  }

  anterior(){
    if(!comida.vive){ // o último é o mais recente
      append(this.posicao_anterior, this.posicao); //o primeiro de todos sobrepõe a cabeça
      }
    for(var i = 0; i < this.posicao_anterior.length-1; i++){
      this.posicao_anterior[this.posicao_anterior.length-1] = this.posicao.copy();
      this.posicao_anterior[i] = this.posicao_anterior[i+1];
    }
  }

  mover(){
    if(keyIsDown(UP_ARROW) && this.cima){
      this.baixo = false;
      this.cima = true;
      this.esquerda = true;
      this.direita = true;
      this.vel1.x = this.vel1.x*0
      this.vel1.y = this.vel1.y - this.velocidade
    }
    if(keyIsDown(DOWN_ARROW) && this.baixo){
      this.cima = false;
      this.esquerda = true;
      this.direita = true;
      this.baixo = true
      this.vel1.x = this.vel1.x*0
      this.vel1.y = this.vel1.y + this.velocidade
    }
    if(keyIsDown(LEFT_ARROW) && this.esquerda){
      this.direita = false;
      this.esquerda = true
      this.cima = true;
      this.baixo = true;
      this.vel1.y= this.vel1.y*0
      this.vel1.x = this.vel1.x - this.velocidade
    }
    if(keyIsDown(RIGHT_ARROW) && this.direita){
      this.esquerda = false;
      this.baixo = true
      this.cima = true
      this.direita = true
      this.vel1.y= this.vel1.y*0
      this.vel1.x = this.vel1.x + this.velocidade
    }
    this.vel1.setMag(this.velocidade)
    this.posicao.add(this.vel1);
  }
  mostrar(){
    background(55);
    //noStroke();
    fill(255);
    rect(this.posicao.x,this.posicao.y,this.comprimento,this.comprimento);
  }
  teleporte(){
    if(this.posicao.x > width + this.comprimento){
      this.posicao.x  = -this.comprimento
    }
    if(this.posicao.x < -this.comprimento){
      this.posicao.x  = width + this.comprimento
    }
    if(this.posicao.y > height + this.comprimento){
      this.posicao.y  = -this.comprimento
    }
    if(this.posicao.y < -this.comprimento){
      this.posicao.y  = height + this.comprimento
    }
  }

   crescimento(){ //controla o resto do corpo
     for(var i = 0; i < this.posicao_anterior.length; i++){
       rect(this.posicao_anterior[i].x,this.posicao_anterior[i].y,this.comprimento,this.comprimento);
     }
   }

  morte(){
    if(this.posicao.x < 0 || this.posicao.x > width - this.comprimento || //bater no canto da tela
       this.posicao.y < 0 || this.posicao.y > height - this.comprimento){

      this.vel1.mult(0);
      this.direita = false;
      this.cima = false;
      this.baixo = false;
      this.esquerda = false;
      textSize(50)
      text('Game Over',(width/2) - 120 ,height/2);
    }
    for(var i = 1; i < this.posicao_anterior.length; i++){ //o primeiro de todos sobrepõe a cabeça
      if(dist(this.posicao.x,this.posicao.y,this.posicao_anterior[i].x,this.posicao_anterior[i].y) < 0.5){
        this.vel1.mult(0);
        this.direita = false;
        this.cima = false;
        this.baixo = false;
        this.esquerda = false;
        textSize(50)
        text('Game Over',(width/2) - 120 ,height/2);
      }
    }
  }

  faztudo(){
    //this.teleporte(); //eu fiz a cobra morrer antes de conseguir teleportar
    this.anterior(); //histórico de posições
    this.mover(); //calcula posição atual
    this.mostrar(); //cabeça + background
    this.crescimento(); //corpo
    this.morte();
  }
}
