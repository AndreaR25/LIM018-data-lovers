import { producerFilter, directorFilter, titleFilter, nameOrder, idFilter} from '../src/data.js';
import data from './data-test.js';

const datafilm = data.films;
const tituloA = datafilm[0];
const tituloB = datafilm[4];
const tituloC = datafilm[2]; 

describe('producerFilter', () => {
  it('is a function', () => {
    expect(typeof producerFilter).toBe('function');
  });


  it('returns `el titulo esperado`', () => {
      expect(producerFilter([tituloA, tituloB, tituloC], 'Isao Takahata')).toEqual([tituloA])
      expect(producerFilter([tituloA, tituloB, tituloC], 'Toshio Suzuki')).toEqual([tituloB])
      expect(producerFilter([tituloA, tituloB, tituloC], 'Hayao Miyazaki')).toEqual([tituloC])
    })
  })


describe('directorFilter', () => {
    it('is a function', () => {
      expect(typeof directorFilter).toBe('function');
    });
  
  
    it('returns `el titulo esperado`', () => {
        expect(directorFilter([tituloA, tituloB, tituloC], 'Hayao Miyazaki')).toEqual([tituloA,tituloC])
        expect(directorFilter([tituloA, tituloB, tituloC], 'Isao Takahata')).toEqual([tituloB])
        expect(directorFilter([tituloA, tituloB, tituloC], 'Hayao Miyazaki')).toEqual([tituloA, tituloC])
      })
    })
 

describe('nameOrder', () => {
  it('is a function', () => {
    expect(typeof nameOrder).toBe('function')
  })

  it('should return an array of films',() => {
    const titlefilms = [
      {"name": "Castle in the sky", "num": "001"},
      {"name": "Princess Mononke", "num": "007"},
      {"name": "The cat Returns", "num": "010"},
    ]
    expect(nameOrder(titlefilms, 'orderAZ')).toEqual([
      {"name": "Castle in the sky", "num": "001"},
      {"name": "Princess Mononke", "num": "007"},
      {"name": "The cat Returns", "num": "010"},
    ])
    expect(nameOrder(titlefilms, 'orderZA')).toEqual([
      {"name": "The cat Returns", "num": "010"},
      {"name": "Princess Mononke", "num": "007"},
      {"name": "Castle in the sky", "num": "001"},
    ])
  })
})

describe('titleFilter',() =>{
  it('titleFilter is a function',()=>{
    expect(typeof titleFilter).toBe('function')
  })
  it('it shoud contain Castle in the first postion when you search "Cas"', ()=>{
    const titlefilms = [
      {"title": "Castle in the sky", "num": "001"},
      {"title": "Princess Mononke", "num": "007"},
      {"title": "The cat Returns", "num": "010"},
    ]
  expect(titleFilter(titlefilms,'cas')).toEqual([{title:'Castle in the sky', num:"001"}])
  })
})
describe('idFilter',() =>{
  it('idFilter is a function',()=>{
    expect(typeof idFilter).toBe('function')
  })
  it('it shoud contain id in the first postion when you search "Cas"', ()=>{
    const titlefilms = [
      {"title": "Castle in the sky", "num": "001"},
      {"title": "Princess Mononke", "num": "007"},
      {"title": "The cat Returns", "num": "010"},
    ]
  expect(titleFilter(titlefilms,'cas')).toEqual([{title:'Castle in the sky', num:"001"}])
  })
})