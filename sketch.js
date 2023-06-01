// Create a LineString geometry
const Feature = ol.Feature;
const VectorSource = ol.source.Vector;
const VectorLayer = ol.layer.Vector;
const LineString = ol.geom.LineString;
//const Point = ol.geom.Point;
const Style = ol.style.Style;
const Stroke = ol.style.Stroke;
const fromLonLat = ol.proj.fromLonLat;
const Overlay = ol.Overlay;

// Two locations with long/lat values in degrees


var map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([12.522970186031527, 41.87462602355191]),
        zoom: 20
    })
})

function coords(arg) {
    map.getView().setCenter(ol.proj.fromLonLat(arg));
    map.getView().setZoom(18)
}

var toggle_loc = false
var toggle_creator = false


function locations() {
    var loc = document.getElementsByClassName("locations")[0]
    var button = document.getElementsByClassName("icon1")[0]
    var loc1 = document.getElementsByClassName("loc1")[0]
    var loc2 = document.getElementsByClassName("loc2")[0]


    if (toggle_loc === true) {
        button.style.backgroundColor = "#ffffff";
        loc.style.display = "none"
        toggle_loc = false
        loc1.style.backgroundColor = "#ffffff"
        loc2.style.backgroundColor = "#ffffff"
    } else {
        button.style.backgroundColor = "#b8b8b8";
        loc.style.display = "flex"
        toggle_loc = true

    }

}

function furio_camillo() {
    coords([12.522970186031527, 41.87462602355191])
    locations()
}

function giulio_agricola() {
    coords([12.562612573069698, 41.85645494135059])
    locations()
}

function change_color(arg) {
    console.log(arg)
}

var data_separator

var coords;

function get_coords() {
    //create_line([12.52335374192067, 41.87509536200062], [12.523895548141704, 41.87548081610649])
    data_separator.push(ol.proj.toLonLat(map.getView().getCenter()))
    console.log(data_separator)
}

function creator() {
    console.log(toggle_creator)
    var creator = document.getElementsByClassName("icon3")[0]
    var selector = document.getElementsByClassName("selector")[0]


    if (toggle_creator === true) {
        creator.style.backgroundColor = "#ffffff";
        selector.style.display = "none"
        data.push(data_separator)
        console.log(data)
        toggle_creator = false
        create_line()

    } else {
        data_separator = [];
        creator.style.backgroundColor = "#b8b8b8";
        selector.style.display = "flex"
        toggle_creator = true
    }
}



function isPointInPolygon(x, y) {
    let isInside = false;

    for (var k = 0; k < data.length; k++) {
        const totalVertices = data[k].length;
        let j = totalVertices - 1;

        for (let i = 0; i < totalVertices; i++) {
            console.log(data[k])
            const vertexI = data[k][i];
            const vertexJ = data[k][j];

            if (
                (vertexI[1] > y) !== (vertexJ[1] > y) &&
                x < ((vertexJ[0] - vertexI[0]) * (y - vertexI[1])) / (vertexJ[1] - vertexI[1]) + vertexI[0]) {
                console.log("is inside")
                alert("you are inside a zone")
                isInside = !isInside;
            }

            j = i;
        }


    }
    return isInside;
}

var data = []

function create_line() {

    console.log(data)

    /* BEGIN: Code for the line joining the 2 points */
    for (var j = 0; j < data.length; j++) {
        for (var i = 0; i < data[j].length; i++) {
            if (i === data[j].length - 1) {
                var points = [fromLonLat(data[j][i]), fromLonLat(data[j][0])];
            } else {
                var points = [fromLonLat(data[j][i]), fromLonLat(data[j][i + 1])];
            }
            var line_feat1 = new Feature({
                geometry: new LineString(points),
                name: "My_Simple_LineString"
            });
            var line_vsrc = new VectorSource({
                features: [line_feat1],
                wrapX: false
            });
            var lineStyle = new Style({
                stroke: new Stroke({
                    color: "red",
                    width: 5,
                    //lineDash: [4, 4, 4],
                    lineCap: "butt"
                })
            });
            var veclay_line = new VectorLayer({
                source: line_vsrc,
                style: lineStyle
            });

            map.addLayer(veclay_line)
        }
    }
}

function choose_area() {
    coords = ol.proj.toLonLat(map.getView().getCenter())
    isPointInPolygon(coords[0], coords[1])
}




//Furio camillo
// [12.522970186031527, 41.87462602355191]
// [12.562612573069698, 41.85645494135059]

//ol.proj.toLonLat(map.getView().getCenter())

/*
[12.52335374192067, 41.87509536200062]
[12.523895548141704, 41.87548081610649]
[12.524053798473592, 41.87532903134735]
[12.523503945625514, 41.874949567872505]
*/