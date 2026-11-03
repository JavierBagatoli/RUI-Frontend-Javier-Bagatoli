import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

interface TestRequest {
  name: string;
}

interface TestResponse {
  id: number;
  name: string;
}

@Injectable()
class TestApiService extends ApiService<TestRequest, TestResponse> {
  constructor(http: HttpClient) {
    super(http, 'heroes');
  }
}

describe('ApiService', () => {
  let service: TestApiService;
  let httpMock: HttpTestingController;

  const API_URL = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    service = TestBed.inject(TestApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // GET
  it('should execute GET request', () => {
    const mockResponse: TestResponse = {
      id: 1,
      name: 'Batman',
    };

    service.get().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_URL);

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // POST
  it('should execute POST request', () => {
    const request: TestRequest = {
      name: 'Superman',
    };

    const mockResponse: TestResponse = {
      id: 2,
      name: 'Superman',
    };

    service.post(request).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_URL);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });

  // PUT
  it('should execute PUT request', () => {
    const request: TestRequest = {
      name: 'Wonder Woman',
    };

    const mockResponse: TestResponse = {
      id: 3,
      name: 'Wonder Woman',
    };

    service.put(request).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_URL);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });

  // DELETE
  it('should execute DELETE request with ID', () => {
    const mockResponse: TestResponse = {
      id: 4,
      name: 'Flash',
    };

    service.delete(4).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/4`);

    expect(req.request.method).toBe('DELETE');

    req.flush(mockResponse);
  });

  // ERROR
  it('should handle HTTP errors', () => {
    let receivedError: unknown;

    service.get().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        receivedError = error;
      },
    });

    const req = httpMock.expectOne(API_URL);

    req.flush(
      { message: 'Server error' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );

    expect(receivedError).toBeTruthy();
  });
});
