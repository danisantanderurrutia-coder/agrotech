/**
 * AgriTwin - ChartManager Module
 * 
 * Lightweight HTML5 Canvas 2D trend chart renderer for sensor telemetry sparklines.
 * Renders smooth historical curves for soil moisture (%) and ambient temperature (°C)
 * without external JavaScript chart dependencies.
 */

export class ChartManager {
  /**
   * Render smooth sparkline chart on target canvas
   * @param {HTMLCanvasElement} canvas 
   * @param {Array} historyData [{ time, moisture, temperature }]
   * @param {string} metric 'moisture' | 'temperature'
   */
  static renderSparkline(canvas, historyData, metric = 'moisture') {
    if (!canvas || !historyData || historyData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 320;
    const height = canvas.height = canvas.parentElement.clientHeight || 90;

    ctx.clearRect(0, 0, width, height);

    const values = historyData.map(d => d[metric] || 0);
    const minVal = Math.min(...values) * 0.9;
    const maxVal = Math.max(...values) * 1.1 || 100;

    const padding = 16;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);

    const points = values.map((val, idx) => {
      const x = padding + (idx / Math.max(1, values.length - 1)) * chartWidth;
      const y = height - padding - ((val - minVal) / Math.max(1, maxVal - minVal)) * chartHeight;
      return { x, y, val };
    });

    const isMoisture = metric === 'moisture';
    const isWind = metric === 'windSpeed';
    const strokeColor = isMoisture ? '#06b6d4' : (isWind ? '#38bdf8' : '#f59e0b');
    const fillColorStart = isMoisture ? 'rgba(6, 182, 212, 0.3)' : (isWind ? 'rgba(56, 189, 248, 0.3)' : 'rgba(245, 158, 11, 0.3)');
    const fillColorEnd = isMoisture ? 'rgba(6, 182, 212, 0.0)' : (isWind ? 'rgba(56, 189, 248, 0.0)' : 'rgba(245, 158, 11, 0.0)');

    // Gradient fill below path
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, fillColorStart);
    gradient.addColorStop(1, fillColorEnd);

    // Draw area fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw main line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    // Draw end point highlight glow
    const lastPoint = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = strokeColor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
}
