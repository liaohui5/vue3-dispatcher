// executor function
interface TaskQueueExecutor {
  (state: object, payload: object, response?: object): void;
}

// task function item
interface TaskItemFunction {
  (state: object, { payload: any, response: object, prevTaskResult: any }): any;
}
interface TaskQueueInterface {
  tasks: Array<TaskItemFunction>;
  onError?: CallableFunction;
  execute: TaskQueueExecutor;
}

interface AsyncTaskQueueInterface extends TaskQueueInterface {
  asyncTask: (payload: object) => Promise<any>;
  taskQueue: TaskQueueInterface;
}

interface TaskQueueCollectionItem {
  type: string;
  queue: AsyncTaskQueue | TaskQueue;
}
type TaskQueueCollection = Array<TaskQueueCollectionItem> | Set<TaskQueueCollectionItem>;

// get executor fucntion in collection
type GetExecutorInCollection = (targetType: string, collection: TaskQueueCollection) => TaskQueueExecutor | void;

// dispatch function
type Dispatcher = (type: string) => (payload: any) => any;
interface ReducerResult {
  dispatch: Dispatcher;
  [key: string]: any;
}
