describe( "CM.Transport.RTCTransport", function() {
  
  describe( "connect", function() {

    var transport;

    beforeEach( function() {
      transport = new CM.Transport.RTCTransport();
    } );

    it( "Should be defined", function() {
      expect( transport.connect ).toBeDefined();
    } );

    it( "Should create connection", function() {
      expect( transport.peerConnection ).toBeNull();
      transport.connect();
      expect( transport.peerConnection ).not.toBeNull();
    } );

    it( "Should call rtc.connection.connecting and rtc.connection.open handlers", function() {
      
      var i = 0;
      
      transport.on( 'rtc.connection.connecting', function() {
        i += 1;
      } ).on( 'rtc.connection.open', function() {
        i += 1;
      } );
      runs( function() {
        transport.connect();
      } );

      waitsFor( function() {
        return i == 2;
      }, "Should increment counter", 50 );

      runs( function() {
        expect( i ).toBe( 2 );
      } );
      
    } );
  } );

} );