export interface UseCase {
  main(...args: any): Promise<any>;
}
