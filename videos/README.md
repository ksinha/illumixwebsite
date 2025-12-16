# Hero Video Setup

Your hero video is now configured and ready to use! Here's what you need to know:

## 📁 Video Location

Place your video file(s) in: **`/Users/kirinsinha/illumixwebsite/videos/`**

## 🎬 Supported Video Formats

The website is configured to support both:
- **MP4** (`hero.mp4`) - Best for Safari and most browsers
- **WebM** (`hero.webm`) - Optional, for better compression in Chrome/Firefox

You can use just MP4, or provide both formats for optimal performance across all browsers. The browser will automatically select the best format it supports.

## ✅ Current Configuration

Your hero video is already set up with these optimal settings:

### HTML Attributes
- ✅ `autoplay` - Starts playing automatically
- ✅ `muted` - Required for autoplay to work (browsers block unmuted autoplay)
- ✅ `loop` - Video repeats continuously
- ✅ `playsinline` - Prevents fullscreen mode on iOS devices
- ✅ `preload="auto"` - Starts loading video immediately for faster playback

### Responsive Design
- ✅ Covers entire hero section while maintaining aspect ratio
- ✅ Optimized for desktop, tablet, and mobile devices
- ✅ Smooth performance with hardware acceleration
- ✅ Mobile-specific optimizations for iOS and Android

## 📏 Recommended Video Specs

For best results, use a video with these specifications:

- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **Duration**: 10-30 seconds (loops automatically)
- **File Size**: Under 10MB for fast loading
- **Format**: H.264 codec for MP4
- **Framerate**: 30fps or 60fps

## 🎨 Video Optimization Tips

1. **Compress your video**: Use tools like HandBrake or FFmpeg to reduce file size
2. **Use a gradient overlay**: The existing overlay gradient ensures text remains readable
3. **Test on mobile**: Videos can consume data, so keep file size reasonable
4. **Consider a poster image**: Add `poster="videos/hero-poster.jpg"` to show an image while loading

## 🔄 How to Replace Video

Simply place your video file in the `videos` folder with the name:
- `hero.mp4` (required)
- `hero.webm` (optional, for better compression)

The video will automatically display on your website!

## 🚀 Next Steps

1. Place your video file as `videos/hero.mp4`
2. (Optional) Create a WebM version for better browser support
3. Test on different devices to ensure it looks great everywhere!

---

**Need help?** The video will display with a gradient background until you add your file.
