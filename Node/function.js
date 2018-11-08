function foo() {
    throw new Error('Ooops!');
}

function bar() {
    foo();
}

function baz() {
    bar();
}

baz();