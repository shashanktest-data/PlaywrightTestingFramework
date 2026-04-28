//find missing num when num not start with 1
let num=[3,4,5,8]
let min=Math.min(...num)
let max=Math.max(...num)
const set=new Set(num)
const missing=[]
for(let i=min;i<=max;i++)
{
    if(!set.has(i))
{
    missing.push(i)
}


}
console.log(missing)

//find misisng num when numstart from 1
const num1=[1,2,3,4,6]
let n=6
let sum=0
for(let i=0;i<num1.length;i++)
{
sum=sum+num1[i]
}
let misisngnum=n*(n+1)/2-sum;
console.log("missing num",misisngnum)

//remove dup ele from array

let num2=[10,20,30,30]
const set1=new Set(num2)
console.log("remove dup ele from array",set1)

let arr=[10,20,4,1];
arr.sort((a,b)=>a-b)
console.log(arr)