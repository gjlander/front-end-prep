enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move: Direction = Direction.Up;

// console.log(move);

function turnWithEnum(dir: Direction) {
  if (dir === Direction.Left) {
    console.log('Turning left');
  }
}
// turnWithEnum(Direction.Left);

type DirUnion = 'up' | 'down' | 'left' | 'right';

function turnWithLiteralUnion(dir: DirUnion) {
  if (dir === 'left') {
    console.log('Turning left');
  }
}

// turnWithLiteralUnion('left');

// console.log(typeof false);
// console.log(typeof 'I am a string!');
// console.log(typeof 34);

const alertMe = (msg: string): void => {
  if (msg) {
    alert(msg);
  } else {
    alert('Did you forget why you wanted to be alerted?');
  }
};

// alertMe('');

function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows both x and y must be strings
    console.log(x.toUpperCase());
  }
}

compare(4, '4');
compare(4, true);
compare('3', '3');

function printValue(value: string | number): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// printValue(4);
// printValue('test');

// console.log(Array.isArray({}));
// console.log(Array.isArray([]));

function logDateOrString(val: Date | string) {
  if (val instanceof Date) {
    console.log(
      val.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  } else {
    console.log(val.trim());
  }
}

logDateOrString('1989-12-24');
logDateOrString(new Date('1989-12-24'));

const throwSomething = (throwError: boolean) => {
  try {
    if (throwError) {
      throw new Error('This will be the message property');
    } else {
      throw "This wouldn't have a message property, and would cause a runtime error";
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Default error message');
    }
  }
};

throwSomething(true);
throwSomething(false);
