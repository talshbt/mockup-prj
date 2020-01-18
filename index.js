
// npm install express
// npm install fixer api
// nmp install fetch 
// than type node app.js
// simple go to the folder contain this file(save him as app.js) and type. 

const fetch = require('node-fetch');
var express = require('express');
var app = express();
var fs = require('fs'),
xml2js = require('xml2js');
const util = require('util');
var createHTML = require('create-html')

var parser = new xml2js.Parser();

var dict = {};
var res;
var arr = [];
var parent;
var exapmle = []

app.get('/', function(request, response) {
    fs.readFile( './test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
           
        function getXmlfields(toFind){
            var myResultArr = [];
            // var x;
            for(var j = 0; j < result.dsedataAll.kColl.length; ++j){
             data  = result.dsedataAll.kColl[j]['$'].id;
             if(data == toFind){
                   for(var i = 0; i < result.dsedataAll.kColl[j]['refData'].length; ++i){
                       obj =  result.dsedataAll.kColl[j]['refData'][i]['$'];
                       var values = Object.values(obj)
                       myResultArr[i] = (values[0].includes('List') ? (values[0].slice(0,values[0].indexOf('List'))) + 'Data' : values[0]);
    
                        if(myResultArr[i].includes('Data')){
        
                            parent = myResultArr[i];
                            dict[parent] = [];

                        }else{

                            dict[parent].push(myResultArr[i]) 
                         
                        }
                        getXmlfields(myResultArr[i]);
                   } 

                   
             }
          }

           return myResultArr;
        }

       arr =getXmlfields('luAnc1ServerData');
      // arr = util.inspect(dict, {showHidden: false, depth: null});

        // console.log(dict)

        

        response.json(dict)

   
 

    });

});

});


app.get('/getHTML', function(request, response) {
    fs.readFile( './test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
           
        function getXmlfields(toFind){
            var myResultArr = [];
            // var x;
            for(var j = 0; j < result.dsedataAll.kColl.length; ++j){
             data  = result.dsedataAll.kColl[j]['$'].id;
             if(data == toFind){
                   for(var i = 0; i < result.dsedataAll.kColl[j]['refData'].length; ++i){
                       obj =  result.dsedataAll.kColl[j]['refData'][i]['$'];
                       var values = Object.values(obj)
                       myResultArr[i] = (values[0].includes('List') ? (values[0].slice(0,values[0].indexOf('List'))) + 'Data' : values[0]);
    
                        if(myResultArr[i].includes('Data')){
        
                            parent = myResultArr[i];
                            dict[parent] = [];

                        }else{

                            dict[parent].push(myResultArr[i]) 
                         
                        }
                        getXmlfields(myResultArr[i]);
                   } 

                   
             }
          }

           return myResultArr;
        }

       arr =getXmlfields('luAnc1ServerData');

       var html = createHTML({
        title: 'example'
      })


      var arr1= [1,2,3];

    //   function getUl(name,liElements){
    //         // return `<ul>
    //         // // ${liElements.map(item => `<li>item</li>`)}
    //         // ${liElements.map(item => item*2)}

            
    //         // </ul`

    //         return 
    //         liElements.map(item => item*2)
    //         // ${liElements.map(item => item*2)}
            

            
           
      
    //   }


      function getUl(listName){

        return `<ul> ${ listName}`
   
    }


    function getLi(elementName){
        return `<li> ${ elementName} `

    }

   
    
 

    



    //   str = `<div>XXX</div>`  + getUl('eran') + '</ul>';
      str = `<style> 
      
      
      *{margin:0;padding:0;}
body{padding:100px;background:#929292;font-size:100%;font-family:"Arial";}
input{font-size:1em;}
ul.tree{padding-left:30px;}



li{list-style-type:none;color:#fff;position:relative;margin-left:-15px;}
li label{padding-left:37px;cursor:pointer;background:url("https://www.thecssninja.com/demo/css_tree/folder-horizontal.png") no-repeat 15px 2px;display:block;}





li input{width:1em;height:1em;position:absolute;left:-0.5em;top:0;opacity:0;cursor:pointer;}
li input + ul{height:1em;margin:-16px 0 0 -44px;background:url("https://www.thecssninja.com/demo/css_tree/toggle-small-expand.png") no-repeat 40px 0;}
li input + ul > li{display:none;margin-left:-14px !important;padding-left:1px}




li.file{margin-left:-1px !important;}
li.file a{display:inline-block;padding-left:21px;color:#fff;text-decoration:none;background:url("https://www.thecssninja.com/demo/css_tree/document.png") no-repeat 0 0;}

li input:checked + ul{height:auto;margin:-21px 0 0 -44px;padding:25px 0 0 80px;background:url("https://www.thecssninja.com/demo/css_tree/toggle-small.png") no-repeat 40px 5px;}
li input:checked + ul > li{display:block;margin:0 0 0.063em;}
li input:checked + ul > li:first-child{margin:0 0 0.125em;}
      </style>
      
      
      <ul class = "tree" >  <li>
      <input type="checkbox" checked id="menu-1" /><div>`


       
        

        for (var p in dict) {

            

            // str += getLi(p)  + '<ul>';
            // str += `<li> ${dict[p]}</li>`
            // str += 'ul'


            // console.log('parent = ' + p)
            // console.log('child = ' + dict[p])
   
      }

      
      for (var p in dict) {

        str +=   ` <li><input type="checkbox" checked id="menu-1" />${p}<ul>`

        //str += `<input type="checkbox" id="menu-1-1" /> <li class="file"><label for="menu-1">${p}</label><a href=""><ul class="bullet-list-round">`

        // console.log("parent = " + p)

        for (var i in dict[p]){
            str += `<li>${dict[p][i]}</li>`

            
            // console.log( "child " + dict[p][i])


        }

        str+= `</ul></li>`
          
      }


      str += `</li></ul></div>`



        response.write(str)
        response.end();  



    });

});
});



var port = 4444;


app.listen(port);

console.log(`node express app started at http://localhost:${port}`)