// Load Google Charts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(initChart);

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC6Q4SM9gQaCUgyANBUdJmClPiT7zpOcns",
    authDomain: "smart-home-c530a.firebaseapp.com",
    databaseURL: "https://smart-home-c530a-default-rtdb.firebaseio.com",
    projectId: "smart-home-c530a",
    storageBucket: "smart-home-c530a.firebasestorage.app",
    messagingSenderId: "969823463702",
    appId: "1:969823463702:web:f8b6e7019a95afd8e38837",
    measurementId: "G-SMLRT8L2SJ"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Lấy tham chiếu đến dữ liệu của các khu vực
var dbRef = {
    Phongngu: {
        Nhietdo: firebase.database().ref('Phongngu/Nhietdon'),
        Doam: firebase.database().ref('Phongngu/Doamn'),
        Buimin: firebase.database().ref('Phongngu/Buiminn')
    },
    Phongkhach: {
        Nhietdo: firebase.database().ref('Phongkhach/Nhietdok'),
        Doam: firebase.database().ref('Phongkhach/Doamk'),
        Buimin: firebase.database().ref('Phongkhach/buiminpk')
    },
    Bancong: {
        Nhietdo: firebase.database().ref('Bancong/Nhietdob'),
        Luongmua: firebase.database().ref('Bancong/Luongmuab'),
        Buimin: firebase.database().ref('Bancong/Buiminb')
    },
    San: {
        Nhietdo: firebase.database().ref('Phongbep/Nhietdop'),
        Doam: firebase.database().ref('Phongbep/Doamp'),
        Khigas: firebase.database().ref('Phongbep/Khigasp')
    }
};

// Biến lưu trữ dữ liệu và biểu đồ
let data;
let chart;
let options;

// Hàm khởi tạo biểu đồ
function initChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Khu vực');
    data.addColumn('number', 'Nhiệt độ (°C)');
    data.addColumn('number', 'Độ ẩm (%)');
    data.addColumn('number', 'Bụi mịn (µg/m³)');
    data.addColumn('number', 'Lượng mưa (mm)');
    data.addColumn('number', 'Khí gas (ppm)');

    // Cấu hình biểu đồ
    options = {
        title: 'Chỉ số môi trường của các khu vực',
        hAxis: { title: 'Khu vực' },
        vAxis: { title: 'Giá trị' },
        legend: { position: 'top' },
        backgroundColor: '#f4f4f4',
        curveType: 'function', // Làm mịn đường
        pointSize: 7, // Hiển thị điểm trên biểu đồ
        lineWidth: 3, // Độ dày của đường
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FFA500', '#800080'], // Màu sắc các đường
        animation: {
            duration: 800,
            easing: 'out',
            startup: true
        }
    };

    // Khởi tạo biểu đồ đường (LineChart)
    chart = new google.visualization.ColumnChart(document.getElementById('chart_div_chinh'));

    // Lắng nghe dữ liệu từ Firebase theo thời gian thực
    updateChartRealtime();
}

// Hàm cập nhật dữ liệu từ Firebase theo thời gian thực
function updateChartRealtime() {
    firebase.database().ref().on('value', snapshot => {
        if (snapshot.exists()) {
            let newData = [
                ['Khu vực', 'Nhiệt độ (°C)', 'Độ ẩm (%)', 'Bụi mịn (µg/m³)', 'Lượng mưa (mm)', 'Khí gas (ppm)'],
                ['Phòng ngủ', getValue(snapshot, 'Phongngu/Nhietdon'), getValue(snapshot, 'Phongngu/Doamn'), getValue(snapshot, 'Phongngu/Buiminn'), 0, 0], // Không có lượng mưa và độ ẩm đất
                ['Phòng khách', getValue(snapshot, 'Phongkhach/Nhietdok'), getValue(snapshot, 'Phongkhach/Doamk'), getValue(snapshot, 'Phongkhach/buiminpk'), 0, 0], // Không có lượng mưa và độ ẩm đất
                ['Ban công', getValue(snapshot, 'Bancong/Nhietdob'), 0, getValue(snapshot, 'Bancong/Buiminb'), getValue(snapshot, 'Bancong/Luongmuab'), 0], // Có lượng mưa
                ['Phòng bếp', getValue(snapshot, 'Phongbep/Nhietdop'), getValue(snapshot, 'Phongbep/Doamp'), 0, 0, getValue(snapshot, 'Phongbep/Khigasp')] // Có cả lượng mưa và độ ẩm đất
            ];

            // Cập nhật dữ liệu biểu đồ
            data = google.visualization.arrayToDataTable(newData);

            // Vẽ lại biểu đồ với hiệu ứng dịch chuyển
            chart.draw(data, options);
        }
    });
}

// Hàm lấy giá trị từ Firebase, nếu null thì trả về 0
function getValue(snapshot, path) {
    return snapshot.child(path).exists() ? snapshot.child(path).val() : 0;
}
