import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/interface';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public category: Category = {name: '', expiration_time: new Date()};

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {

  }

  create() {
    this.categoryService.createCategory(this.category).subscribe(
      data => {
        this.router.navigate([`/category/${data.id}`]);
        console.log(data);
      }
    );
  }
}
