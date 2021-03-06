/**
 * Editor service
 *
 */
(function () {
  angular
    .module("Horn", [])
    .factory('editor', ['$rootScope', function ($rootScope) {
      var mode = 'markdown',
          switchingTabs = false,
          tabs = [
            {
              name: "untitled 1",
              isSaved: true
            },
            {
              name: "untitled 2"
            },
            {
              name: "untitled 3"
            }
          ],
          current = tabs[0],
          cm;

      return {
        renderedText: "",

        tabs: tabs,

        init: function (textarea) {
          var self = this;

          cm = CodeMirror.fromTextArea(textarea, {
            mode: 'gfm',
            theme: 'kirin',
            tabSize: 2,
            lineWrapping: true
          });

          cm.setSize('100%', '80%');

          cm.on('change', function (instance, changes) {
            current.body = instance.getValue();
            if (!switchingTabs) {
              current.isSaved = false;
              $rootScope.$apply();
            } else {
              switchingTabs = false;
            }
          });
        },

        setMode: function (name) {
          mode = name;
          if (name != 'markdown')
            this.render();
        },

        setTab: function (number) {
          current = tabs[number];
          switchingTabs = true;
          cm.setValue(current.body || "");
        },

        isMode: function (name) {
          return mode === name;
        },

        render: function () {
          this.renderedText = marked(cm.getValue());
        },

        newFile: function () {
          var self = this;

          this.getNewFileName(function (newFileName) {
            var length = self.tabs.push({name: newFileName, body: ""});
            self.setTab(length - 1);
            $rootScope.$apply();
          });
        },

        /*
         * Getting all files stored in app's Drive directory
         */
        getDriveFiles: function (callback) {
          if (typeof callback != 'function')
            return;

          chrome.syncFileSystem.requestFileSystem(function (fs) {
            var directoryReader = fs.root.createReader();
            directoryReader.readEntries(function (entries) {
              callback(entries);
            });
          });
        },

        getNewFileName: function (callback) {
          this.getDriveFiles(function (entries) {
            var regExp = /untitled (\d*)(\.v\d*)?\.md/,
                lastIndex = 0,
                newFileName;
            for (var i = 0, max = entries.length; i < max; i++) {
              var entry = entries[i],
                  result = regExp.exec(entry.name);
              if (result && +result[1] > lastIndex)
                lastIndex = result[1];
            };
            lastIndex++;
            newFileName = "untitled " + lastIndex;

            callback(newFileName);
          });
        },

        /*
         * Saving file to Drive
         */
        saveFile: function () {
          var self = this;
          chrome.syncFileSystem.requestFileSystem(function (fs) {
            fs.root.getFile(current.name + '.md', {create: true}, function (fileEntry) {
              fileEntry.createWriter(function (writer) {
                writer.write(new Blob([cm.getValue()]));
                current.isSaved = true;
                $rootScope.$apply();
              });
            });
          });
        }
      }
  }]);
})();
