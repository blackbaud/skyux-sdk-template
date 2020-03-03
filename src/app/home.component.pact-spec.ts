import { TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { SkyPactService } from '@skyux-sdk/pact';

describe('My pact', () => {
  let pactService: SkyPactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
    pactService = TestBed.get(SkyPactService);
    pactService.addInteraction('my-provider', {
      uponReceiving: '{description}',
      state: '{provider_state}',
      withRequest: {
        method: 'GET',
        path: '/api/path',
        headers: {
          'Origin': 'https://host.nxt.blackbaud.com (or whatever your SPA domain is)'
        }
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': {},
          'Access-Control-Allow-Origin': 'host.nxt.blackbaud.com'
        }
      }
    });
  });

  afterEach(() => {
    pactService.finalize('my-provider');
  });

  it('should', () => {
    pactService.verify('my-provider');
  });
});
