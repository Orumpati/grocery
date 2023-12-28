import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll | undefined;
products:Array<any>=[]
//lastkey:String=null
category:any
  constructor() { }

  ngOnInit() {
    this.category ='sai'
    fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(result=>{
  console.log(result)
  this.products = result.products
});
  }


  categories = [
    { name: 'Category 1', imageUrl: 'https://images.ctfassets.net/yc8ipemhgj36/9iTIPNpZLPmsumAZNlUTW/971f638f44b9fbf1781a0a69327c7af2/module2_products_555x383_SP_202205261404.png?fm=png' },
    { name: 'Category 2', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.JXTfClH0fSoKkCttPs87qwHaFM&pid=Api&P=0&h=180' },
    {name:'jhgg',imageUrl:'https://tse3.mm.bing.net/th?id=OIP.SP1TjiMmL2m_JbH8GBMo9wAAAA&pid=Api&P=0&h=180'},
    {name:'jhgg',imageUrl:'https://tse2.mm.bing.net/th?id=OIP.dgXrmv1ajhHu2XpyaW30qQHaHa&pid=Api&P=0&h=180'},
    {name:'jhgg',imageUrl:'https://tse4.mm.bing.net/th?id=OIP.kz7lU8hDhz7jxgoY-EmmIQHaHa&pid=Api&P=0&h=180'},
 
    // Add more categories as needed
  ];

  selectedCategory: any = 'sai';

  selectCategory(category: any) {
    this.selectedCategory = category;
  }

}
