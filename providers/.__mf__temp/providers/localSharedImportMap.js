
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "react": async () => {
          let pkg = await import("__mf__virtual/providers__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/providers__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "@mui/material": async () => {
          let pkg = await import("__mf__virtual/providers__prebuild___mf_0_mui_mf_1_material__prebuild__.js")
          return pkg
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await import("__mf__virtual/providers__prebuild___mf_0_emotion_mf_1_styled__prebuild__.js")
          return pkg
        }
      ,
        "@emotion/react": async () => {
          let pkg = await import("__mf__virtual/providers__prebuild___mf_0_emotion_mf_1_react__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "react": {
            name: "react",
            version: "19.1.0",
            scope: ["default"],
            loaded: false,
            from: "providers",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.0.0"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.1.0",
            scope: ["default"],
            loaded: false,
            from: "providers",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.0.0"
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "7.0.2",
            scope: ["default"],
            loaded: false,
            from: "providers",
            async get () {
              usedShared["@mui/material"].loaded = true
              const {"@mui/material": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.0.2"
            }
          }
        ,
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "providers",
            async get () {
              usedShared["@emotion/styled"].loaded = true
              const {"@emotion/styled": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0"
            }
          }
        ,
          "@emotion/react": {
            name: "@emotion/react",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "providers",
            async get () {
              usedShared["@emotion/react"].loaded = true
              const {"@emotion/react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      