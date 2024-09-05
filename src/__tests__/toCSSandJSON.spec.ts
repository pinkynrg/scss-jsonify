import fs from 'fs';
import { toCSS, toJSON } from '../index';

[
  // 'test-0', 
  // 'test-1', 
  'test-2'
].forEach((test: string) => {

  const cssFileContent = fs.readFileSync(`${__dirname}/${test}.css`, 'utf8');
  const jsonFileContent = JSON.parse(fs.readFileSync(`${__dirname}/${test}.json`, 'utf8'))

  it('should return the expected css from json', async () => {
    const builtJson = toJSON(cssFileContent)
    expect(builtJson).toEqual(jsonFileContent)
  });

  // it('should return the expected css from json', async () => {
  //   const builtCSS = toCSS(jsonFileContent)
  //   expect(builtCSS).toBe(cssFileContent)
  // });

  // it('should match itself if converted to json and back to css', async () => {
  //   const builtJson = toJSON(cssFileContent)
  //   const backtoCSS = toCSS(builtJson)
  //   expect(backtoCSS).toEqual(cssFileContent)
  // })

  // it('should match itself if converted to css and back to json', async () => {
  //   const builtCSS = toCSS(jsonFileContent)
  //   const backtoJson = toJSON(builtCSS)
  //   expect(backtoJson).toEqual(jsonFileContent)
  // })

})