import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {Candidate, Category, Order, Params, SearchParams, User} from '../../models/interface';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {debounce, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CandidateService} from '../../services/candidate.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  private paramsSubscribe: Subscription;
  private categoryId: number;
  public category: Category;
  public newCandidate: Candidate = {name: '', countvotes: 0};
  public vote = -1;

  public candidates: Candidate[] = [];
  private changeSoughtSubscription: Subscription;
  public searchParams: SearchParams = {
    sortBy: Params.NAME,
    order: Order.ASC,
    sought: '',
    page: 0,
    size: 0
  };

  public _Order = Order;
  public _Params = Params;

  @ViewChild('searchInput', {static: true})
  private input: ElementRef;

  constructor(private categoryService: CategoryService,
              private candidateService: CandidateService,
              private activatedRoute: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.paramsSubscribe = this.activatedRoute.params.subscribe(params => {
      this.categoryId = params.id;
      this.loadCategory();
    });

    this.changeSoughtSubscription =  fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounce(() => timer(300)),
        distinctUntilChanged(),
        switchMap(() => {
          this.candidates = [];
          return this.candidateService.getCandidates(this.searchParams, this.categoryId);
        })
      )
      .subscribe(
        (data: Candidate[]) => {
          this.candidates = data;
        }
      );
    this.getCandidates();

    this.categoryService.getVote(this.categoryId).subscribe(
      data => {
        this.vote = data.id;
      }
    );

  }


  newSearch() {
    this.candidates = [];
    this.getCandidates();
  }
  getCandidates() {
    this.candidateService.getCandidates(this.searchParams, this.categoryId).subscribe(
      (data: Candidate[]) => {
        console.log(data);
        this.candidates = this.candidates.concat(data);
      }
    );
  }

  loadCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe(
      (data: Category) => {
        console.log(data);
        this.category = data;
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
    this.changeSoughtSubscription.unsubscribe();
  }

  edit() {
    this.categoryService.editCategory(this.category).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  addNewCandidate() {
    this.candidateService.addCandidate(this.newCandidate, this.categoryId).subscribe(
      data => {
        console.log(data);
        this.newSearch();
      }
    );
  }


  changeVote(id: number) {
    this.vote = id !== this.vote ? id : -1;
    this.categoryService.vote(this.categoryId, id).subscribe(
      data => {
        console.log(data);
        this.newSearch();
      }
    );

  }

}
