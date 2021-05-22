/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(e) {
	video[this.name] = this.value;
}
function handleProgress(e) {
	// video.duration returns the length of the current audio/video
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
   // because digit of video duration not percent    
   // console.log(video.duration)
	console.log(scrubTime);
   video.currentTime = scrubTime;
}
// Hook up the event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
// first check mousedown variable == true  it moves on to scrubs func and if mousedown variable == false it's just going to return false 
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);
