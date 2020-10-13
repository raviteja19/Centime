import React,{useState,useEffect,useRef} from 'react';
import { Chart } from "react-google-charts";
import {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import * as allactions from './actions/allactions';
import DrawChart from './DrawChart'


function App(props)
{

    const [data,setData]=useState([]);
    const [orgdata,SetorgData]=useState([]);
    const [name,setNames]=useState([]);
    const addper=useRef(null);
    const addexp=useRef(null);
    const addpersref=useRef(null);
    const addexpref=useRef(null);
    const [myname,setMyname]=useState('')
    const [personname,setPersonName]=useState('');
    const [exptype,setExptype]=useState('mobile');
    const [amount,setAmount]=useState(0);
    const [optiontype,setOptionType]=useState('person');
    const [salary,setSalary]=useState(0);
    useEffect(()=>{
        props.actions.getData();
    },[])
    
    useEffect(()=>{
        console.log(props.getData)
        let chartdata=[ ['Inflow', 'Outflow', 'Money']];
        let charmap=new Map();
        for(let obj in props.getData)
        {
            let exp=props.getData[obj].expenditures;
            charmap.set(props.getData[obj].name,0);
            for(let expobj in exp)
            {
                if(charmap.get(props.getData[obj].name)!=undefined)
                {
                    let count=charmap.get(props.getData[obj].name);
                    count+=exp[expobj];
                    charmap.set(props.getData[obj].name,count);
                }else{
                    charmap.set(props.getData[obj].name,exp[expobj]);
                }
                let maobj=[props.getData[obj].name,expobj,exp[expobj]]
                chartdata.push(maobj);
            }
            let expsal=charmap.get(props.getData[obj].name);
            if(expsal==undefined)
            expsal=0;

            let maobj=[props.getData[obj].name,"savings",(props.getData[obj].salary-expsal)];
            chartdata.push(maobj);
            
        }

        let arr=[...charmap.keys()]
        setNames(arr);
        SetorgData(props.getData);
        setData(chartdata);

    },[props.getData])

    useEffect(()=>{

        
    },[orgdata])

    const changetype=(e)=>{
        let id=e.target.id;
        
        if(id=="addperson"){

            addper.current.style.backgroundColor='#00c4b4';
            addexp.current.style.backgroundColor='#adabab';
            addpersref.current.style.display='block';
            addexpref.current.style.display='none';
            setOptionType('person');
        }else if("addexpenditure")
        {

            addper.current.style.backgroundColor='#adabab';
            addexp.current.style.backgroundColor='#00c4b4';
            addpersref.current.style.display='none';
            addexpref.current.style.display='block';
            setOptionType('expenses');
        }
    }

    const OnChangeInput=(e)=>{
        let id=e.target.id,value=e.target.value;
       
        if(id=="name")
        {
            setPersonName(value)
        }else if(id=="expensetype")
        {
            setExptype(value);
        }
    }

    const setUpdatevalues=(e)=>{
        
        let val=e.target.id;
        let arr=val.split('-');
        // setPersonName(arr[0]);setExptype(arr[1]);setAmount(arr[2])
    }



    const addRecords=(e)=>{
        e.preventDefault();

        let obj={},arr=[],isexists=false;
        
        if(optiontype=='person'){
            obj={...obj,name:myname,salary:parseInt(salary),expenditures:{mobile:0,electricity:0}}
            
            if(myname==''||salary==0)
            {
            errorDocument('please enter all values to add person')
             return false;}

            for(let i in orgdata)
            {

                if(orgdata[i].name==myname)
                isexists=true;

                arr.push(orgdata[i])
            }
            if(!isexists)
            arr.push(obj);

           
        }   else {

            if(amount==0)
            {
                errorDocument('please enter amount to update') 
            return false;
        }

            for(let i in orgdata)
            {

                let newobj={}
                if(orgdata[i].name==personname)
                {

                    orgdata[i].expenditures[exptype]=parseInt(amount);
                    newobj={...newobj,...orgdata[i]}
                    arr.push(newobj)
                }
                else if(personname==''&&orgdata[i].name==name[0])
                {
                    orgdata[i].expenditures[exptype]=parseInt(amount);
                    newobj={...newobj,...orgdata[i]}
                    arr.push(newobj)
                }
                else{
                    newobj={...newobj,...orgdata[i]}
                    arr.push(newobj)
                }
               
            }

        }


        props.actions.chartData(arr);
       
    }

    const onDelete=(e)=>{
        e.preventDefault();
        let id=e.target.id;
        for(let i in orgdata)
        {
            
            if(orgdata[i].name==data[id][0])
            {

                delete orgdata[i].expenditures[data[id][1]];
            }
        }
        console.log(orgdata)
        props.actions.chartData(orgdata)
    }

     const errorDocument=(message)=>{
        let child=document.getElementById('ActionAppend');
       
        let d=document.createElement('div');
        d.id="ActionMsgwithdrawS";
        d.className="alert alert-danger";
        d.style="display:block";
        let messagenode=document.createElement('strong');
        messagenode.innerHTML ='Error!'+message;
        d.appendChild(messagenode);
        child.appendChild(d)
    
        setTimeout(()=>{
          document.getElementById('ActionAppend').style.opacity=0
          document.getElementById('ActionAppend').style.transition='opacity 1s';
          
        },2500)
        setTimeout(()=>{
          document.getElementById('ActionAppend').style.opacity=1;
          document.getElementById('ActionAppend').removeChild(d);
        },3000)
    
    
        
      }

    return (
        <div >
            <div id="ActionAppend" style={{position:'absolute',zIndex:1,left:'25%'}}></div>
            <div className="chartcontainer">
                <div className="options">
                    
                </div>
                <div>
                <DrawChart data={data}/>
                    </div>
                <div className="addoptions">
                    
                    <div className="labeloption">
                        <div className="add" ref={addper} onClick={changetype} id="addperson" style={{backgroundColor:'#00c4b4'}}>Add Person</div>
                        <div></div>
                        <div className="add" ref={addexp} id="addexpenditure" onClick={changetype} style={{backgroundColor:'#9E9E9E'}}>Update Expenditure</div>
                    </div>
                    <div className="addlayout" ref={addpersref}>
                        <div className="form-group">
                            <label htmlFor="usr">Name:</label>
                            <input type="text" className="form-control" id="usr" placeholder="Enter name" value={myname} onChange={(e)=>setMyname(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Salary:</label>
                            <input type="text" className="form-control" id="salary" placeholder="Enter salary" value={salary} onChange={(e)=>{if(e.target.value>=0)setSalary(e.target.value)}} />
                            <button type="button" className="btn btn-success" style={{width:'95%',margin:'10px'}} onClick={addRecords}>Add</button>
                        </div>
                        
                    </div>
                    <div className="addlayout" ref={addexpref} style={{display:'none'}}>
                        <div style={{display:'grid',gridTemplateColumns:'50% 50%'}}>
                            <div className="form-group" style={{margin:'5px'}}>
                                <label htmlFor="sel1">Select Name:</label>
                                <select className="form-control" id="name" onChange={OnChangeInput}>
                                    {name.map((data,i)=>{
                                        return (
                                            <option key={data+'-'+i} value={data}>{data}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group" style={{margin:'5px'}}>
                                <label htmlFor="sel1">Expenditure type:</label>
                                <select className="form-control" id="expensetype" onChange={OnChangeInput}>
                                    <option value="mobile">Mobile</option>
                                    <option value="electricity">Electricity</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Amount:</label>
                            <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={(e)=>{if(e.target.value>=0)setAmount(e.target.value)}}/>
                            <button type="button" className="btn btn-success" style={{width:'95%',margin:'10px'}} onClick={addRecords}>Update</button>
                        </div>
                    </div>
                </div>
        </div>

            <div className="userinput">
                <div>
                    <label>Name:</label>
                </div>
                <div>
                    <label>Expenditure Type:</label>
                </div>
                <div>
                    <label>Amount:</label>
                </div>
            </div>
                    {data.map((data,i)=>{

                        if(data[0]=="Inflow" || data[1]=="savings")
                        return null;

                        return (
                            <div className="userinputbox shadowbox" key={i}  id={data[0]+'-'+data[1]+'-'+data[2]} >
                               <div>{data[0]}</div>
                               <div>{data[1]}</div>
                               <div style={{display:'grid',gridTemplateColumns:'70% 30%' }}>
                                <div>{data[2]}</div>
                                <div>
                                    <img src="src/images/trash-o.svg" style={{height:'25px',width:'25px',cursor:'pointer'}} onClick={onDelete} id={i}></img>
                                </div>
                               </div>
                            </div>
                        );
                    })}
        </div>
    );

}

const mapStateToProps=(state,props)=>{
        return {
            getData:state.Landing
        }
    
}
const mapDispatchToProps=(dispatch)=>{
        return {
            actions:bindActionCreators(allactions,dispatch)
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);