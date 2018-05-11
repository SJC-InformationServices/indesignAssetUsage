#target "InDesign"; // this solves the "Error Number: 29446" problem
#targetengine "session"; // this solves the "Error Number: 30476" problem
#include "../ImageUsage/lib/sjcArchive/sjcArchive.js";
    
// THE MAIN PROCESS
// -----------------------------------------------
var fcaTitle = "Create Document History";

var fcaHandlers = {
    
	'beforeDisplay' : function(ev)
		{
		ev.target.enabled = (app.documents.length>0);
		},
		
	'onInvoke' : function()
		{
		var doc;
		for( var i = app.documents.length-1 ; i>=0 ; i-- )
			{
			doc = app.documents[i];
			registerChanges({"target":doc,"eventType":"afterOpen"});
			}
		}
	};
app.addEventListener("afterOpen",registerDocument);
app.addEventListener("beforeClose",registerChanges);
app.addEventListener("afterSave",registerDocument);
app.addEventListener("afterSaveAs",registerDocument); 

// THE MENU INSTALLER
// -----------------------------------------------
var fcaMenuInstaller = fcaMenuInstaller||
(function(mnuTitle,mnuHandlers)
{
// 1. Create the script menu action
var mnuAction = app.scriptMenuActions.add(mnuTitle);

// 2. Attach the event listener
var ev;
for( ev in mnuHandlers )
	{
	mnuAction.eventListeners.add(ev,mnuHandlers[ev]);
	}

// 3. Create the menu item
var fileMenu = app.menus.item("$ID/Main").submenus.item("$ID/&File");
var refItem = fileMenu.menuItems.item("$ID/&Close");

fileMenu.menuItems.add(mnuAction,LocationOptions.after,refItem);
		
return true;
})(fcaTitle, fcaHandlers);