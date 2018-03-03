import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos properties with items returned from service', () => {
    let testTodos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([testTodos])
    })
    component.ngOnInit();
    expect(component.todos).toBe(testTodos);

  });

  it('should call the server to save the changes when add is called', () => {

    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    })
    component.add();
    expect(spy).toHaveBeenCalled();

  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.from([todo]);
    })
    component.add();
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);

  });

  it('should handle errors if an error is returned from the server', () => {
    let error = 'error from server';
    spyOn(service, 'add').and.returnValue(Observable.throw(error));
    component.add();
    expect(component.message).toBe(error);
  });

  it('should call the server to deleted id, if confirm is true', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not call the server to deleted id, if confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());
    component.delete(1);
    expect(spy).not.toHaveBeenCalled();
  });

});