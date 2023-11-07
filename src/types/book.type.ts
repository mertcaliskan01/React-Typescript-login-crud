export default interface IBookData {
  _id?: number | null,
  title: string,
  description: string,
  price: number,
  published?: boolean,
}