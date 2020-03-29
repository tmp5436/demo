import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Order, Params, SearchParams, Stats} from '../../models/interface';
import {CategoryService} from '../../services/category.service';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public stats: Stats;
  public categories: Category[] = [];
  private changeSoughtSubscription: Subscription;
  public endOfCategories = false;
  public searchParams: SearchParams = {
    sortBy: Params.NAME,
    order: Order.ASC,
    sought: '',
    page: 0,
    size: 6
  };

  public _Order = Order;
  public _CategoryParams = Params;

  @ViewChild('searchInput', {static: true})
  private input: ElementRef;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.changeSoughtSubscription =  fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounce(() => timer(300)),
        distinctUntilChanged(),
        switchMap(() => {
          this.searchParams.page = 0;
          this.endOfCategories = false;
          this.categories = [];
          return this.categoryService.getCategories(this.searchParams);
        })
      )
      .subscribe(
        (data: Category[]) => {
          this.categories = data;
        }
      );
    this.getCategories();
    this.categoryService.getStats().subscribe(
      data => {
        console.log(data);
        this.stats = data;
      }
    );
  }


  onPageChanged() {
    this.searchParams.page = this.searchParams.page + 1;
    this.getCategories();
  }
  newSearch() {
    this.searchParams.page = 0;
    this.endOfCategories = false;
    this.categories = [];
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories(this.searchParams).subscribe(
      (data: Category[]) => {
        console.log(data);
        this.categories = this.categories.concat(data);
      }
    );
  }
  ngOnDestroy() {
    this.changeSoughtSubscription.unsubscribe();
  }

}
