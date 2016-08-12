var fs=require("fs");
const readline = require('readline');

var output1=fs.createWriteStream('part1.json');
output1.readable=true;
output1.writable=true;

var output2=fs.createWriteStream('part2.json');
output2.readable=true;
output2.writable=true;
const rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')
  });
  var obj={};
  var colname=[];
  var line1=[];
  var output=[];
  var bar1=[];
  var bar2=[];
  var k=0;
  var a_c = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
  "Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
    rl.on('line', function (line){
        if(k==0)
        {
          colname=line.split(',');
          //console.log(colname);
          k=k+1;
        }
        else{
          var lineInfo=line.split(",");
          if(lineInfo[0]=="India"){
            if(lineInfo[2]=="Urban population (% of total)" || lineInfo[2]=="Rural population (% of total population)")
            {
              if(lineInfo[4]>=1960&&lineInfo[4]<=2015)
              {
                bar1.push({IndicatorName:lineInfo[2],year:lineInfo[4],value:lineInfo[5]});
                //obj[lineInfo[0]]=output;
              //  console.log(bar1);
              }
            }
          }
          var temp=[];
          for(k=0;k<a_c.length;k++){
            if(lineInfo[0]==a_c[k]){
              if(lineInfo[2]=="Urban population" || lineInfo[2]=="Rural population")
                {
                  if(lineInfo[4]>=1960&&lineInfo[4]<=2015)
                  {
                    bar2.push({CountryName:lineInfo[0],IndicatorName:lineInfo[2],year:lineInfo[4],value:lineInfo[5]});
                  }
                }
              }
            }
          }

          });

          var urbanAndRural=[];
          var obj={};
          var sum=0; var obj1={};
          rl.on('close',() =>{
          // console.log(bar2);<!--part1-->

      //console.log(obj);
for(y=1960;y<=2015;y++){
      for(k=0;k<a_c.length;k++){

        for(i=0;i<bar2.length-1;i+=2){
      if(bar2[i].CountryName==a_c[k]){

if(bar2[i].year==y){
    //  urbanAndRural.push({IndicatorName:bar2[i].IndicatorName,year:bar2[i].year,value:bar2[i].value});
      sum=sum+(parseFloat(bar2[i].value))+(parseFloat(bar2[i+1].value));
      urbanAndRural.push({CountryName:bar2[i].CountryName,value:sum});
      // console.log(bar2[i].CountryName+bar2[i].year+" "+(parseFloat(bar2[i].value))+bar2[i].IndicatorName);
      //console.log(bar2[i].CountryName+" "+bar2[i].year+" "+sum);
urbanAndRural.sort(function(a,b){
  return b.value-a.value;
});
      obj1[bar2[i].year]=urbanAndRural;
      sum=0;
    }
  }
  }
  //obj1[bar2[i].year]=urbanAndRural;
     }
urbanAndRural=[];
}
 output2.write(JSON.stringify(obj1));
  output1.write(JSON.stringify(bar1));
//console.log(bar1);
//console.log(obj1);<!--part2-->
//obj2["India"]=bar1;
//console.log(obj1);
});
