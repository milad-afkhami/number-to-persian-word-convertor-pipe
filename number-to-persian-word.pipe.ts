import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToPersianWord'
})
export class NumberToPersianWordPipe implements PipeTransform {
  transform(value: number): string {
    let input: number;
    let temp: number;
    const sep: number[] = [];

    // Deleting decimals:
    input = Math.floor(value);

    // Here we are separating the input digits:
    while (input !== 0) {
      temp = input % 10;
      sep.unshift(temp);
      input = Math.floor(input / 10);
    }

    // Here we unshift enough zero digits to sep array- 
    // -so we can separate our input digits to ternary packs.
    if (sep.length % 3 === 1) {
      sep.unshift(...[0, 0]);
    } else if (sep.length % 3 === 2) {
      sep.unshift(0);
    }

    const abcs = [];
    // Here we separating our input digits to ternary packs:
    while (sep.length !== 0) {
      abcs.unshift(sep.slice(sep.length > 3 ? sep.length - 3 : 0, sep.length));
      sep.splice(sep.length > 3 ? sep.length - 3 : 0, sep.length);
    }

    let output: string;
    // in following conditional statements, we are grouping 
    // the input to different categories, based on its size:
    if (abcs.length === 4) {
      output = `${this.sOutput(abcs[0])} میلیارد `;
      if (abcs[1][0] + abcs[1][1] + abcs[1][2] !== 0) {
        output += ` و ${this.sOutput(abcs[1])} میلیون `;
      }
      if (abcs[2][0] + abcs[2][1] + abcs[2][2] !== 0) {
        output += ` و ${this.sOutput(abcs[2])} هزار `;
      }
      if (abcs[3][0] + abcs[3][1] + abcs[3][2] !== 0) {
        output += ` و ${this.sOutput(abcs[3])} `;
      }
      output += `ریال `;
    } else if (abcs.length === 3) {
      output = `${this.sOutput(abcs[0])} میلیون `;
      if (abcs[1][0] + abcs[1][1] + abcs[1][2] !== 0) {
        output += ` و ${this.sOutput(abcs[1])} هزار `;
      }
      if (abcs[2][0] + abcs[2][1] + abcs[2][2] !== 0) {
        output += ` و ${this.sOutput(abcs[2])} `;
      }
      output += `ریال `;
    } else if (abcs.length === 2) {
      output = `${this.sOutput(abcs[0])} هزار `;
      if (abcs[1][0] + abcs[1][1] + abcs[1][2] !== 0) {
        output += `و ${this.sOutput(abcs[1])} `;
      }
      output += `ریال `;
    } else {
      output = `${this.sOutput(abcs[0])} ریال`;
    }
    // And here we simply returning output:
    return output;
  }

  // Here we are returning the hundreds(sadgan) part of our ternary packs: 
  sadgan(sadgan) {
    let temp: string;
    switch (sadgan) {
      case 0:
        temp = '';
        break;
      case 1:
        temp = 'صد';
        break;
      case 2:
        temp = 'دویست';
        break;
      case 3:
        temp = 'سیصد';
        break;
      case 4:
        temp = 'چهارصد';
        break;
      case 5:
        temp = 'پانصد';
        break;
      case 6:
        temp = 'ششصد';
        break;
      case 7:
        temp = 'هفتصد';
        break;
      case 8:
        temp = 'هشتصد';
        break;
      case 9:
        temp = 'نهصد';
        break;
    }
    return temp;
  }

  // Here we are combining the ones(yekan) and tens(dahgan) of our 
  // ternary packs together, because of irregular pattern of numbers
  // between 10 and 20 ( We specifying these numbers in 'dahYekan' method ).
  dahganYekan(d, y) {
    let temp: string;
    switch (d) {
      case 0:
        temp = this.yekan(y);
        break;
      case 1:
        temp = this.dahYekan(y);
        break;
      case 2:
        temp = 'بیست' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 3:
        temp = 'سی' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 4:
        temp = 'چهل' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 5:
        temp = 'پنجاه' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 6:
        temp = 'شصت' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 7:
        temp = 'هفتاد' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 8:
        temp = 'هشتاد' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
      case 9:
        temp = 'نود' + (y !== 0 ? ' و' : '') + this.yekan(y);
        break;
    }
    return temp;
  }

  // Here we are returning the ones(yekan) part of our ternary packs: 
  yekan(yekan) {
    let temp: string;
    switch (yekan) {
      case 0:
        temp = '';
        break;
      case 1:
        temp = 'یک';
        break;
      case 2:
        temp = 'دو';
        break;
      case 3:
        temp = 'سه';
        break;
      case 4:
        temp = 'چهار';
        break;
      case 5:
        temp = 'پنج';
        break;
      case 6:
        temp = 'شش';
        break;
      case 7:
        temp = 'هفت';
        break;
      case 8:
        temp = 'هشت';
        break;
      case 9:
        temp = 'نه';
        break;
    }
    return temp;
  }

  //in cases that the tens(dahgan) part of our ternary pack is equal to "1":
  dahYekan(y) {
    let temp: string;
    switch (y) {
      case 0:
        temp = 'ده';
        break;
      case 1:
        temp = 'یازده';
        break;
      case 2:
        temp = 'دوازده';
        break;
      case 3:
        temp = 'سیزده';
        break;
      case 4:
        temp = 'چهارده';
        break;
      case 5:
        temp = 'پانزده';
        break;
      case 6:
        temp = 'شانزده';
        break;
      case 7:
        temp = 'هفده';
        break;
      case 8:
        temp = 'هجده';
        break;
      case 9:
        temp = 'نوزده';
        break;
    }
    return temp;
  }

  // sOutput(small output) is ternary packs of output
  // that converted to persian words.
  sOutput(abcArr) {
    let soutput = '';
    let temp = ' و ';
    soutput += this.sadgan(abcArr[0]);
    if (abcArr[0] !== 0 && abcArr[1] + abcArr[2] !== 0) {
      // Here we are adding ' و ' or just empty space to the soutput:
      soutput += temp;
    } else {
      soutput += ' ';
    }
    soutput += this.dahganYekan(abcArr[1], abcArr[2]);
    return soutput;
  }
}
