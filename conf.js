// conf.js
exports.config = {
  capabilities: {
        'browserName': 'chrome'
  },
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: ['spec.js']
  // specs:['src/app/test-cases/log-in.spec.js']
  specs:['src/app/test-cases/log-in.spec.js','src/app/test-cases/parcel.spec.js',]

}