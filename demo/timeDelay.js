function delay(secends = 1) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), secends * 1000);
  });
}

exports.delay = delay;
