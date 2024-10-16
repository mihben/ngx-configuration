import { JsonConfigurationSourceOptions, JsonConfigurationSourceService } from './json-configuration-source.service';
import { createHttpFactory } from '@ngneat/spectator';
import { faker } from '@faker-js/faker';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { of } from 'rxjs';

describe('JsonConfigurationSourceService', () => {
    const createSut = createHttpFactory({
        service: JsonConfigurationSourceService,
        mocks: [JsonConfigurationSourceOptions],
    });

    it('[JCS-001] - Read configuration content', async () => {
        // Arrange
        const sut = createSut();
        const content = {
            baseAddress: faker.internet.url,
            service: {
                baseAddress: faker.internet.url,
                filters: [faker.string.sample, faker.string.sample],
            },
        };

        const httpMock = sut.inject(HttpClient);
        jest.spyOn(httpMock, 'get').mockReturnValue(of(content));

        // Act
        const result = await sut.service.loadAsync();

        // Assert
        expect(result!['baseAddress']).toEqual(content.baseAddress);
        expect(result!['service:baseAddress']).toEqual(content.service.baseAddress);
        expect(result!['service:filters:0']).toEqual(content.service.filters[0]);
        expect(result!['service:filters:1']).toEqual(content.service.filters[1]);
    });

    it('[JCS-002] - Not found configuration', async () => {
        // Arrange
        const sut = createSut();

        const optionsMock = sut.inject(JsonConfigurationSourceOptions);
        optionsMock.path = faker.system.filePath();

        const httpMock = sut.inject(HttpClient);
        jest.spyOn(httpMock, 'get').mockImplementation(() => {
            throw new HttpErrorResponse({
                status: HttpStatusCode.NotFound,
                statusText: 'NotFound',
            });
        });

        // Act
        // Assert
        await expect(sut.service.loadAsync()).rejects.toEqual(new Error(`Mandatory configuration on '${optionsMock.path}' path was not found`));
    });

    it('[JCS-003] - Optional configuration', async () => {
        // Arrange
        const sut = createSut();

        const optionsMock = sut.inject(JsonConfigurationSourceOptions);
        optionsMock.path = faker.system.filePath();
        optionsMock.optional = true;

        const httpMock = sut.inject(HttpClient);
        jest.spyOn(httpMock, 'get').mockImplementation(() => {
            throw new HttpErrorResponse({
                status: HttpStatusCode.NotFound,
                statusText: 'NotFound',
            });
        });

        // Act
        const result = await sut.service.loadAsync();

        // Assert
        expect(result).toBeNull();
    });
});
