//
//  TrailConservancyUITests.swift
//  TrailConservancyUITests
//
//  Created by Chris Mann on 1/26/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class TrailConservancyUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
      
      let app = XCUIApplication()
      setupSnapshot(app)
      app.launch()
      
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        
       sleep(20)
        // Use recording to get started writing UI tests.
      
      
      let app = XCUIApplication()
 
      sleep(10)
      snapshot("01LaunchScreen")
      
      // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
    
}