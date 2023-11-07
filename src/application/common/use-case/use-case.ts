export interface UseCase<Request, Response> {
  execute(data: Request): Response | Promise<Response>;
}
