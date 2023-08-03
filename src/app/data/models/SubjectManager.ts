import { Subject } from 'rxjs';

/* The SubjectManager class is a TypeScript class that manages a subject and provides methods to get
and set its value. */
export class SubjectManager<T> {
  private subject = new Subject<T>();

  get getSubject() {
    return this.subject.asObservable();
  }

  set setSubject(value: T) {
    this.subject.next(value);
  }
}