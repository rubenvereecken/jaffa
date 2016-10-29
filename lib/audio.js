export default function fingerprintAudio (callback) {
  console.log('fp audio');
    // Details: https://audiofingerprint.openwpm.com/
    var hybrid_output = [];
    var audioCtx = new(window.AudioContext || window.webkitAudioContext),
        oscillator = audioCtx.createOscillator(),
        analyser = audioCtx.createAnalyser(),
        gain = audioCtx.createGain(),
        scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1),
        compressor, bins;
    // Create and configure compressor
    compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold && (compressor.threshold.value = -50);
    compressor.knee && (compressor.knee.value = 40);
    compressor.ratio && (compressor.ratio.value = 12);
    compressor.reduction && (compressor.reduction.value = -20);
    compressor.attack && (compressor.attack.value = 0);
    compressor.release && (compressor.release.value = .25);
    gain.gain.value = 0; // Disable volume
    oscillator.type = 'triangle'; // Set oscillator to output triangle wave
    oscillator.connect(compressor); // Connect oscillator output to dynamic compressor
    compressor.connect(analyser); // Connect compressor to analyser
    analyser.connect(scriptProcessor); // Connect analyser output to scriptProcessor input
    scriptProcessor.connect(gain); // Connect scriptProcessor output to gain input
    gain.connect(audioCtx.destination); // Connect gain output to audiocontext destination
    scriptProcessor.onaudioprocess = function(bins) {
        bins = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(bins);
        for (var i = 0; i < bins.length; i = i + 1) {
            hybrid_output.push(bins[i]);
        }
        analyser.disconnect();
        scriptProcessor.disconnect();
        gain.disconnect();
        var audioFp = JSON.stringify(hybrid_output);
        callback(audioFp);
    };
    oscillator.start(0);
}
