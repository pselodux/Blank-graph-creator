//test
var piRef = activeDocument.pathItems;
var txRef = activeDocument.textFrames;
var pureBlack = new CMYKColor();
pureBlack.black = 100;
var gridColor = new CMYKColor();
gridColor.black = 39;


startGUI();

    function startGUI() {
        var win = new Window("dialog", "Blank graph creator", undefined);
        win.orientation = "column";
        win.alignChildren = ["fill", "fill"];

        var firstGroup = win.add("panel", undefined, undefined);
        firstGroup.orientation = "row";
        firstGroup.alignChildren = ["fill", "fill"];

        var secondGroup = win.add("panel", undefined, undefined);
        secondGroup.orientation = "row";
        secondGroup.alignChildren = ["fill", "fill"];

        var groupOne = firstGroup.add("panel", undefined, undefined);
        groupOne.orientation = "column";
        groupOne.alignChildren = ["fill", "fill"];

        var titleMsgS = groupOne.add("statictext", undefined, "y-axis divisions");
        var txt_vTicks = groupOne.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_vTicks.helpTip = "Vertical divisions";
        txt_vTicks.text = 10;

        var titleMsgR = groupOne.add("statictext", undefined, "x-axis divisions");
        var txt_hTicks = groupOne.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_hTicks.helpTip = "Horizontal divisions";
        txt_hTicks.text = 10;

        var groupTwo = firstGroup.add("panel", undefined, undefined);
        groupTwo.orientation = "column";
        groupTwo.alignChildren = ["fill", "fill"];

        var titleMsgS = groupTwo.add("statictext", undefined, "y-axis scale");
        var txt_yMult = groupTwo.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_yMult.helpTip = "Vertical division multiplier";
        txt_yMult.text = 1;


        var titleMsgR = groupTwo.add("statictext", undefined, "x-axis scale");
        var txt_xMult = groupTwo.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_xMult.helpTip = "Horizontal division multiplier";
        txt_xMult.text = 1;

        var groupThree = firstGroup.add("panel", undefined, undefined);
        groupThree.orientation = "column";
        groupThree.alignChildren = ["fill", "fill"];

        var titleMsgS = groupThree.add("statictext", undefined, "y-axis label");
        var txt_yLabel = groupThree.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_yMult.helpTip = "Vertical axis label";

        var titleMsgR = groupThree.add("statictext", undefined, "x-axis label");
        var txt_xLabel = groupThree.add("edittext { characters: 6, justify: 'left', active: true }");
        txt_xMult.helpTip = "Horizontal axis label";


        txt_vTicks.active = true;


        win.addEventListener ("keydown", function(kd) {enter(kd)});

        var groupFour = secondGroup.add("panel", undefined, undefined);
        groupFour.orientation = "column";
        groupFour.alignChildren = ["fill", "fill"];

        var titleMsgS = groupFour.add("statictext", undefined, "Graph title");
        var txt_graphTitle = groupFour.add("edittext { characters: 24, justify: 'left', active: true }");
        txt_graphTitle.helpTip = "Title to be displayed above graph";

        var groupFive = secondGroup.add("panel", undefined, undefined);
        groupFive.orientation = "column";
        groupFive.alignChildren = ["fill", "fill"];



        var genBtn = groupFive.add("button", undefined, "Generate");
        genBtn.maximumSize = [100,20];
        genBtn.helpTip = "Generate graph";
        genBtn.onClick = function() {
            createGraph(txt_yMult.text, txt_xMult.text, txt_vTicks.text, txt_hTicks.text, txt_yLabel.text, txt_xLabel.text, txt_graphTitle.text);
            win.close();
            }
        function enter(k) {
            if (k.keyname == "Enter") {
                createGraph(txt_yMult.text, txt_xMult.text, txt_vTicks.text, txt_hTicks.text, txt_yLabel.text, txt_xLabel.text, txt_graphTitle.text);
                win.close();
                }
            }

        var quitBtn = groupFive.add("button", undefined, "Close");
        quitBtn.helpTip = "Press Esc to close";
        quitBtn.maximumSize = [100,20];

        quitBtn.onClick = function() {
            win.close();
            }

        win.center();
        win.show();
        };

function createGraph(yMult, xMult, vTicks, hTicks, yLabel, xLabel, graphTitle) {

for (i = 0; i <= hTicks; i++)
{
    var tx = txRef.add();
    tx.contents = i * xMult;
    tx.top = -2.5;
    tx.left = i * 20;

    var charCount = tx.textRange.characters.length;
    for (j = 0; j < charCount; j++)
    {
        var txChar = tx.textRange.characters[j].characterAttributes;
        var txPara = tx.textRange.paragraphs[0].paragraphAttributes;
        txChar.size = "9";
 //       txChar.textFont = app.textFonts.getByName("STIX-Regular");
        txChar.fillColor = pureBlack;
        txPara.justification = Justification.CENTER;
    }


}

// add y-axis mark labels
for (i = 0; i <= vTicks; i++)
{
    var tx = txRef.add();
    tx.contents = i * yMult;
    tx.top = i * 20 + 7;
    tx.left = -6;

    var charCount = tx.textRange.characters.length;
    for (j = 0; j < charCount; j++)
    {
        var txChar = tx.textRange.characters[j].characterAttributes;
        var txPara = tx.textRange.paragraphs[0].paragraphAttributes;
        txChar.size = "9";
 //       txChar.textFont = app.textFonts.getByName("STIX-Regular");
        txChar.fillColor = pureBlack;
        txPara.justification = Justification.RIGHT;
    }


}

// draw x-axis marks
for (i = 0; i <= hTicks; i++)
{
    var ticks = piRef.add();

    ticks.setEntirePath([[0, 0],[0, 5]]);
    var left = i * 20;
    var top = 0;
    ticks.position = [left, top];

    ticks.stroked = true;
    ticks.strokeColor = pureBlack;
    ticks.strokeWidth = 0.5;
}

// draw y-axis marks
for (i = 0; i <= vTicks; i++)
{
    var ticks = piRef.add();

    ticks.setEntirePath([[5, 0],[0, 0]]);
    var left = -5;
    var top = i * 20;
    ticks.position = [left, top];

    ticks.stroked = true;
    ticks.strokeColor = pureBlack;
    ticks.strokeWidth = 0.5;
}

// draw vertical gridlines

for (i = 0; i < hTicks; i++)
{
    var grid = piRef.add();

    grid.setEntirePath([[0, (vTicks * 20)],[0, 0]]);
    var left = (i+1) * 20;
    var top = vTicks * 20;
    grid.position = [left, top];

    grid.stroked = true;
    grid.filled = false;
    grid.strokeColor = gridColor;
    grid.strokeWidth = 0.5;
}

// draw horizontal gridlines

for (i = 0; i < vTicks; i++)
{
    var grid = piRef.add();

    grid.setEntirePath([[(hTicks * 20), 0],[0, 0]]);
    var left = 0;
    var top = (i+1) * 20;
    grid.position = [left, top];

    grid.stroked = true;
    grid.filled = false;
    grid.strokeColor = gridColor;
    grid.strokeWidth = 0.5;
}

// draw x and y axes
var hSize = (hTicks * 20) + 10;
var vSize = (vTicks * 20) + 10;

var axes = piRef.add();

axes.setEntirePath([[hSize, 0],[0, 0],[0, vSize]]);

axes.filled = false;
axes.stroked = true;
axes.strokeColor = pureBlack;
axes.strokeWidth = 0.5;

// draw x axis arrow
var xArrow = piRef.add();

xArrow.setEntirePath([[0, 0],[0, 2.905],[5.42, 1.453],[0, 0]]);

xArrow.filled = true;
xArrow.stroked = false;
xArrow.fillColor = pureBlack;
xArrow.top = 1.453;
xArrow.left = (hTicks * 20) + 9.58;

// draw y axis arrow

var yArrow = piRef.add();

yArrow.setEntirePath([[0, 0],[1.452, 5.42],[2.905, 0],[0, 0]]);

yArrow.filled = true;
yArrow.stroked = false;
yArrow.fillColor = pureBlack;
yArrow.top = (vTicks * 20) + 15;
yArrow.left = -1.453;

// add x axis label


if (xLabel.length > 0) {
    var tx = txRef.add();
    tx.contents = xLabel;
    tx.top = -15;
    tx.left = hTicks * 10;

    var charCount = tx.textRange.characters.length;
    for (j = 0; j < charCount; j++)
    {
        var txChar = tx.textRange.characters[j].characterAttributes;
        var txPara = tx.textRange.paragraphs[0].paragraphAttributes;
        txChar.size = "8";
 //       txChar.textFont = app.textFonts.getByName("OpenSans");
        txChar.fillColor = pureBlack;
        txPara.justification = Justification.CENTER;
    }
} else {};

// add y axis label

var yShift = yMult.length;

if (yLabel.length > 0) {
    var tx = txRef.add();
    tx.contents = yLabel;
    tx.top = vTicks * 10 + 10;
    tx.left = -15.5 - (yShift * 4.5);

    var charCount = tx.textRange.characters.length;
    for (j = 0; j < charCount; j++)
    {
        var txChar = tx.textRange.characters[j].characterAttributes;
        var txPara = tx.textRange.paragraphs[0].paragraphAttributes;
        txChar.size = "8";
//        txChar.textFont = app.textFonts.getByName("OpenSans");
        txChar.fillColor = pureBlack;
        txPara.justification = Justification.CENTER;
    }

    tx.rotate(90);
} else {};


// add graph title


if (graphTitle.length > 0) {
    var tx = txRef.add();
    tx.contents = graphTitle;
    tx.top = (vTicks * 20) + 30;
    tx.left = hTicks * 10;

    var charCount = tx.textRange.characters.length;
    for (j = 0; j < charCount; j++)
    {
        var txChar = tx.textRange.characters[j].characterAttributes;
        var txPara = tx.textRange.paragraphs[0].paragraphAttributes;
        txChar.size = "8";
 //       txChar.textFont = app.textFonts.getByName("OpenSans-Semibold");
        txChar.fillColor = pureBlack;
        txPara.justification = Justification.CENTER;
    }
} else {};
};
