# OBJECT
/*
This P5 sketch is a template for getting started with Serial Communication. 
The SerialEvent callback is where incoming data is received 


By Arielle Hein, adapted from ITP Phys Comp Serial Labs
Edited March 12 2019

*/
var count = 0;
var push,turn,shoot;
var data = [];
var serial; //variable to hold an instance of the serial port library
var portName = '/dev/cu.usbmodem1421'; //fill in with YOUR port

function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);

  //let's figure out what port we're on - useful for determining your port
  // serial.on('list', printList); //set a callback function for the serialport list event
  // serial.list(); //list the serial ports
}

function draw() {
  if(shoot == 1)
    background('blue');
  else
    background('green');
  console.log(shoot);
  if(shoot == 2)
    fill('red');
  else
    fill((turn*2)/2);
  ellipse(200,200,push,turn);
  fill('white');
  textAlign(CENTER);
  text("FUCK YOU",200,200);
  
  if(count <255&&keyIsDown(39)){
     count+=5;
  }
  if(count >0&&keyIsDown(37)){
    count-=5;
  }
  console.log(count);
  serial.write(count);
    
}


//all my callback functions are down here:
//these are useful for giving feedback

function serverConnected(){
	console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

//THIS IS WHERE WE RECEIVE DATA!!!!!!
//make sure you're reading data based on how you're sending from arduino
function serialEvent(){
	//receive serial data here
  var inst = serial.readLine();
  if(inst.length>0)
  {
    data = inst.split(",");
    turn = data[0];
    push = data[1];
    shoot = data[2];
    turn = map(turn,0,1024,0,255);
    push = map(push,0,1034,0,255);

    
  }
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
function mouseClicked()
{
  var ye = map(mouseX,0,width,0,255);
  serial.write(ye);
  
}
